const {Connector} = require('./connectors')
const Vertex3D = require('./math/Vertex3')
const Vector2D = require('./math/Vector2')
const Vector3D = require('./math/Vector3')
const Polygon = require('./math/Polygon3')

const {fromPolygons} = require('./CSGFactories')
const {fromSides, fromFakeCSG} = require('./CAGFactories')

const canonicalize = require('./utils/canonicalize')
const retesselate = require('./utils/retesellate')
const {isCAGValid, isSelfIntersecting} = require('./utils/cagValidation')
const {area, getBounds} = require('./utils/cagMeasurements')

// all of these are good candidates for elimination in this scope, since they are part of a functional api
const {overCutInsideCorners} = require('../api/ops-cnc')
const {extrudeInOrthonormalBasis, extrudeInPlane, extrude, rotateExtrude} = require('../api/ops-extrusions')
const cagoutlinePaths = require('../api/cagOutlinePaths')
const center = require('../api/center')
const {expand, contract, expandedShellOfCAG} = require('../api/ops-expandContract')
/**
 * Class CAG
 * Holds a solid area geometry like CSG but 2D.
 * Each area consists of a number of sides.
 * Each side is a line between 2 points.
 * @constructor
 */
let CAG = function () {
  this.sides = []
  this.isCanonicalized = false
}

CAG.prototype = {
  union: function (cag) {
    let cags
    if (cag instanceof Array) {
      cags = cag
    } else {
      cags = [cag]
    }
    let r = this._toCSGWall(-1, 1)
    r = r.union(
            cags.map(function (cag) {
              return cag._toCSGWall(-1, 1).reTesselated()
            }), false, false)
    return fromFakeCSG(r).canonicalized()
  },

  subtract: function (cag) {
    let cags
    if (cag instanceof Array) {
      cags = cag
    } else {
      cags = [cag]
    }
    let r = this._toCSGWall(-1, 1)
    cags.map(function (cag) {
      r = r.subtractSub(cag._toCSGWall(-1, 1), false, false)
    })
    r = r.reTesselated()
    r = r.canonicalized()
    r = fromFakeCSG(r)
    r = r.canonicalized()
    return r
  },

  intersect: function (cag) {
    let cags
    if (cag instanceof Array) {
      cags = cag
    } else {
      cags = [cag]
    }
    let r = this._toCSGWall(-1, 1)
    cags.map(function (cag) {
      r = r.intersectSub(cag._toCSGWall(-1, 1), false, false)
    })
    r = r.reTesselated()
    r = r.canonicalized()
    r = fromFakeCSG(r)
    r = r.canonicalized()
    return r
  },

  transform: function (matrix4x4) {
    let ismirror = matrix4x4.isMirroring()
    let newsides = this.sides.map(function (side) {
      return side.transform(matrix4x4)
    })
    let result = fromSides(newsides)
    if (ismirror) {
      result = result.flipped()
    }
    return result
  },

  flipped: function () {
    let newsides = this.sides.map(function (side) {
      return side.flipped()
    })
    newsides.reverse()
    return fromSides(newsides)
  },

  // ALIAS !
  center: function (axes) {
    return center({axes: axes}, [this])
  },

  // ALIAS !
  expandedShell: function (radius, resolution) {
    return expandedShellOfCAG(this, radius, resolution)
  },

  // ALIAS !
  expand: function (radius, resolution) {
    return expand(this, radius, resolution)
  },

  contract: function (radius, resolution) {
    return contract(this, radius, resolution)
  },

  // ALIAS !
  area: function () {
    return area(this)
  },

  // ALIAS !
  getBounds: function () {
    return getBounds(this)
  },
  // ALIAS !
  isSelfIntersecting: function (debug) {
    return isSelfIntersecting(this, debug)
  },
  // extrusion: all aliases to simple functions
  extrudeInOrthonormalBasis: function (orthonormalbasis, depth, options) {
    return extrudeInOrthonormalBasis(this, orthonormalbasis, depth, options)
  },

  // ALIAS !
  extrudeInPlane: function (axis1, axis2, depth, options) {
    return extrudeInPlane(this, axis1, axis2, depth, options)
  },

  // ALIAS !
  extrude: function (options) {
    return extrude(this, options)
  },

  // ALIAS !
  rotateExtrude: function (options) { // FIXME options should be optional
    return rotateExtrude(this, options)
  },

  // ALIAS !
  check: function () {
    return isCAGValid(this)
  },

  // ALIAS !
  canonicalized: function () {
    return canonicalize(this)
  },

  // ALIAS !
  reTesselated: function () {
    return retesselate(this)
  },

  // ALIAS !
  getOutlinePaths: function () {
    return cagoutlinePaths(this)
  },

  // ALIAS !
  overCutInsideCorners: function (cutterradius) {
    return overCutInsideCorners(this, cutterradius)
  },

  // All the toXXX functions
  toString: function () {
    let result = 'CAG (' + this.sides.length + ' sides):\n'
    this.sides.map(function (side) {
      result += '  ' + side.toString() + '\n'
    })
    return result
  },

  _toCSGWall: function (z0, z1) {
    let polygons = this.sides.map(function (side) {
      return side.toPolygon3D(z0, z1)
    })
    return fromPolygons(polygons)
  },

  _toVector3DPairs: function (m) {
        // transform m
    let pairs = this.sides.map(function (side) {
      let p0 = side.vertex0.pos
      let p1 = side.vertex1.pos
      return [Vector3D.Create(p0.x, p0.y, 0),
        Vector3D.Create(p1.x, p1.y, 0)]
    })
    if (typeof m !== 'undefined') {
      pairs = pairs.map(function (pair) {
        return pair.map(function (v) {
          return v.transform(m)
        })
      })
    }
    return pairs
  },

  /*
    * transform a cag into the polygons of a corresponding 3d plane, positioned per options
    * Accepts a connector for plane positioning, or optionally
    * single translation, axisVector, normalVector arguments
    * (toConnector has precedence over single arguments if provided)
    */
  _toPlanePolygons: function (options) {
    const defaults = {
      flipped: false
    }
    options = Object.assign({}, defaults, options)
    let {flipped} = options
    // reference connector for transformation
    let origin = [0, 0, 0]
    let defaultAxis = [0, 0, 1]
    let defaultNormal = [0, 1, 0]
    let thisConnector = new Connector(origin, defaultAxis, defaultNormal)
    // translated connector per options
    let translation = options.translation || origin
    let axisVector = options.axisVector || defaultAxis
    let normalVector = options.normalVector || defaultNormal
    // will override above if options has toConnector
    let toConnector = options.toConnector ||
            new Connector(translation, axisVector, normalVector)
    // resulting transform
    let m = thisConnector.getTransformationTo(toConnector, false, 0)
    // create plane as a (partial non-closed) CSG in XY plane
    let bounds = this.getBounds()
    bounds[0] = bounds[0].minus(new Vector2D(1, 1))
    bounds[1] = bounds[1].plus(new Vector2D(1, 1))
    let csgshell = this._toCSGWall(-1, 1)
    let csgplane = fromPolygons([new Polygon([
      new Vertex3D(new Vector3D(bounds[0].x, bounds[0].y, 0)),
      new Vertex3D(new Vector3D(bounds[1].x, bounds[0].y, 0)),
      new Vertex3D(new Vector3D(bounds[1].x, bounds[1].y, 0)),
      new Vertex3D(new Vector3D(bounds[0].x, bounds[1].y, 0))
    ])])
    if (flipped) {
      csgplane = csgplane.invert()
    }
    // intersectSub -> prevent premature retesselate/canonicalize
    csgplane = csgplane.intersectSub(csgshell)
    // only keep the polygons in the z plane:
    let polys = csgplane.polygons.filter(function (polygon) {
      return Math.abs(polygon.plane.normal.z) > 0.99
    })
    // finally, position the plane per passed transformations
    return polys.map(function (poly) {
      return poly.transform(m)
    })
  },

  /*
    * given 2 connectors, this returns all polygons of a "wall" between 2
    * copies of this cag, positioned in 3d space as "bottom" and
    * "top" plane per connectors toConnector1, and toConnector2, respectively
    */
  _toWallPolygons: function (options) {
        // normals are going to be correct as long as toConn2.point - toConn1.point
        // points into cag normal direction (check in caller)
        // arguments: options.toConnector1, options.toConnector2, options.cag
        //     walls go from toConnector1 to toConnector2
        //     optionally, target cag to point to - cag needs to have same number of sides as this!
    let origin = [0, 0, 0]
    let defaultAxis = [0, 0, 1]
    let defaultNormal = [0, 1, 0]
    let thisConnector = new Connector(origin, defaultAxis, defaultNormal)
        // arguments:
    let toConnector1 = options.toConnector1
        // let toConnector2 = new Connector([0, 0, -30], defaultAxis, defaultNormal);
    let toConnector2 = options.toConnector2
    if (!(toConnector1 instanceof Connector && toConnector2 instanceof Connector)) {
      throw new Error('could not parse Connector arguments toConnector1 or toConnector2')
    }
    if (options.cag) {
      if (options.cag.sides.length !== this.sides.length) {
        throw new Error('target cag needs same sides count as start cag')
      }
    }
        // target cag is same as this unless specified
    let toCag = options.cag || this
    let m1 = thisConnector.getTransformationTo(toConnector1, false, 0)
    let m2 = thisConnector.getTransformationTo(toConnector2, false, 0)
    let vps1 = this._toVector3DPairs(m1)
    let vps2 = toCag._toVector3DPairs(m2)

    let polygons = []
    vps1.forEach(function (vp1, i) {
      polygons.push(new Polygon([
        new Vertex3D(vps2[i][1]), new Vertex3D(vps2[i][0]), new Vertex3D(vp1[0])]))
      polygons.push(new Polygon([
        new Vertex3D(vps2[i][1]), new Vertex3D(vp1[0]), new Vertex3D(vp1[1])]))
    })
    return polygons
  },

    /**
     * Convert to a list of points.
     * @return {points[]} list of points in 2D space
     */
  toPoints: function () {
    let points = this.sides.map(function (side) {
      let v0 = side.vertex0
      // let v1 = side.vertex1
      return v0.pos
    })
    // due to the logic of fromPoints()
    // move the first point to the last
    if (points.length > 0) {
      points.push(points.shift())
    }
    return points
  },

    /** Convert to compact binary form.
   * See fromCompactBinary.
   * @return {CompactBinary}
   */
  toCompactBinary: function () {
    let cag = this.canonicalized()
    let numsides = cag.sides.length
    let vertexmap = {}
    let vertices = []
    let numvertices = 0
    let sideVertexIndices = new Uint32Array(2 * numsides)
    let sidevertexindicesindex = 0
    cag.sides.map(function (side) {
      [side.vertex0, side.vertex1].map(function (v) {
        let vertextag = v.getTag()
        let vertexindex
        if (!(vertextag in vertexmap)) {
          vertexindex = numvertices++
          vertexmap[vertextag] = vertexindex
          vertices.push(v)
        } else {
          vertexindex = vertexmap[vertextag]
        }
        sideVertexIndices[sidevertexindicesindex++] = vertexindex
      })
    })
    let vertexData = new Float64Array(numvertices * 2)
    let verticesArrayIndex = 0
    vertices.map(function (v) {
      let pos = v.pos
      vertexData[verticesArrayIndex++] = pos._x
      vertexData[verticesArrayIndex++] = pos._y
    })
    let result = {
      'class': 'CAG',
      sideVertexIndices: sideVertexIndices,
      vertexData: vertexData
    }
    return result
  }
}

module.exports = CAG
