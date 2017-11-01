const {EPS, angleEPS, areaEPS, defaultResolution3D} = require('./constants')
const {Connector} = require('./connectors')
const OrthoNormalBasis = require('./math/OrthoNormalBasis')
const Vertex2D = require('./math/Vertex2')
const Vertex3D = require('./math/Vertex3')
const Vector2D = require('./math/Vector2')
const Vector3D = require('./math/Vector3')
const Polygon = require('./math/Polygon3')
const Path2D = require('./math/Path2')
const Side = require('./math/Side')
const {linesIntersect} = require('./math/lineUtils')
const {parseOptionAs3DVector, parseOptionAsBool, parseOptionAsFloat, parseOptionAsInt} = require('./optionParsers')
const FuzzyCAGFactory = require('./FuzzyFactory2d')
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

/** Construct a CAG from a list of `Side` instances.
 * @param {Side[]} sides - list of sides
 * @returns {CAG} new CAG object
 */
CAG.fromSides = function (sides) {
  let cag = new CAG()
  cag.sides = sides
  return cag
}


// Converts a CSG to a  The CSG must consist of polygons with only z coordinates +1 and -1
// as constructed by _toCSGWall(-1, 1). This is so we can use the 3D union(), intersect() etc
CAG.fromFakeCSG = function (csg) {
  let sides = csg.polygons.map(function (p) {
    return Side._fromFakePolygon(p)
  })
        .filter(function (s) {
          return s !== null
        })
  return CAG.fromSides(sides)
}

/** Construct a CAG from a list of points (a polygon).
 * The rotation direction of the points is not relevant.
 * The points can define a convex or a concave polygon.
 * The polygon must not self intersect.
 * @param {points[]} points - list of points in 2D space
 * @returns {CAG} new CAG object
 */
CAG.fromPoints = function (points) {
  let numpoints = points.length
  if (numpoints < 3) throw new Error('CAG shape needs at least 3 points')
  let sides = []
  let prevpoint = new Vector2D(points[numpoints - 1])
  let prevvertex = new Vertex2D(prevpoint)
  points.map(function (p) {
    let point = new Vector2D(p)
    let vertex = new Vertex2D(point)
    let side = new Side(prevvertex, vertex)
    sides.push(side)
    prevvertex = vertex
  })
  let result = CAG.fromSides(sides)
  if (result.isSelfIntersecting()) {
    throw new Error('Polygon is self intersecting!')
  }
  let area = result.area()
  if (Math.abs(area) < areaEPS) {
    throw new Error('Degenerate polygon!')
  }
  if (area < 0) {
    result = result.flipped()
  }
  result = result.canonicalized()
  return result
}

const CAGFromCAGFuzzyFactory = function (factory, sourcecag) {
  let _this = factory
  let newsides = sourcecag.sides.map(function (side) {
    return _this.getSide(side)
  })
      // remove bad sides (mostly a user input issue)
      .filter(function (side) {
        return side.length() > EPS
      })
  return CAG.fromSides(newsides)
}

CAG.prototype = {
  toString: function () {
    let result = 'CAG (' + this.sides.length + ' sides):\n'
    this.sides.map(function (side) {
      result += '  ' + side.toString() + '\n'
    })
    return result
  },

  _toCSGWall: function (z0, z1) {
    const CSG = require('./CSG') // FIXME: circular dependencies CAG=>CSG=>CAG
    let polygons = this.sides.map(function (side) {
      return side.toPolygon3D(z0, z1)
    })
    return CSG.fromPolygons(polygons)
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
    const CSG = require('./CSG') // FIXME: circular dependencies CAG=>CSG=>CAG
    let flipped = options.flipped || false
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
    let csgplane = CSG.fromPolygons([new Polygon([
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
    // due to the logic of CAG.fromPoints()
    // move the first point to the last
    if (points.length > 0) {
      points.push(points.shift())
    }
    return points
  },

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
    return CAG.fromFakeCSG(r).canonicalized()
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
    r = CAG.fromFakeCSG(r)
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
    r = CAG.fromFakeCSG(r)
    r = r.canonicalized()
    return r
  },

  transform: function (matrix4x4) {
    let ismirror = matrix4x4.isMirroring()
    let newsides = this.sides.map(function (side) {
      return side.transform(matrix4x4)
    })
    let result = CAG.fromSides(newsides)
    if (ismirror) {
      result = result.flipped()
    }
    return result
  },

    // see http://local.wasp.uwa.edu.au/~pbourke/geometry/polyarea/ :
    // Area of the polygon. For a counter clockwise rotating polygon the area is positive, otherwise negative
    // Note(bebbi): this looks wrong. See polygon getArea()
  area: function () {
    let polygonArea = 0
    this.sides.map(function (side) {
      polygonArea += side.vertex0.pos.cross(side.vertex1.pos)
    })
    polygonArea *= 0.5
    return polygonArea
  },

  flipped: function () {
    let newsides = this.sides.map(function (side) {
      return side.flipped()
    })
    newsides.reverse()
    return CAG.fromSides(newsides)
  },

  getBounds: function () {
    let minpoint
    if (this.sides.length === 0) {
      minpoint = new Vector2D(0, 0)
    } else {
      minpoint = this.sides[0].vertex0.pos
    }
    let maxpoint = minpoint
    this.sides.map(function (side) {
      minpoint = minpoint.min(side.vertex0.pos)
      minpoint = minpoint.min(side.vertex1.pos)
      maxpoint = maxpoint.max(side.vertex0.pos)
      maxpoint = maxpoint.max(side.vertex1.pos)
    })
    return [minpoint, maxpoint]
  },

  isSelfIntersecting: function (debug) {
    let numsides = this.sides.length
    for (let i = 0; i < numsides; i++) {
      let side0 = this.sides[i]
      for (let ii = i + 1; ii < numsides; ii++) {
        let side1 = this.sides[ii]
        if (linesIntersect(side0.vertex0.pos, side0.vertex1.pos, side1.vertex0.pos, side1.vertex1.pos)) {
          if (debug) { console.log('side ' + i + ': ' + side0); console.log('side ' + ii + ': ' + side1) }
          return true
        }
      }
    }
    return false
  },

  expandedShell: function (radius, resolution) {
    resolution = resolution || 8
    if (resolution < 4) resolution = 4
    let cags = []
    let pointmap = {}
    let cag = this.canonicalized()
    cag.sides.map(function (side) {
      let d = side.vertex1.pos.minus(side.vertex0.pos)
      let dl = d.length()
      if (dl > EPS) {
        d = d.times(1.0 / dl)
        let normal = d.normal().times(radius)
        let shellpoints = [
          side.vertex1.pos.plus(normal),
          side.vertex1.pos.minus(normal),
          side.vertex0.pos.minus(normal),
          side.vertex0.pos.plus(normal)
        ]
                //      let newcag = CAG.fromPointsNoCheck(shellpoints);
        let newcag = CAG.fromPoints(shellpoints)
        cags.push(newcag)
        for (let step = 0; step < 2; step++) {
          let p1 = (step === 0) ? side.vertex0.pos : side.vertex1.pos
          let p2 = (step === 0) ? side.vertex1.pos : side.vertex0.pos
          let tag = p1.x + ' ' + p1.y
          if (!(tag in pointmap)) {
            pointmap[tag] = []
          }
          pointmap[tag].push({
            'p1': p1,
            'p2': p2
          })
        }
      }
    })
    for (let tag in pointmap) {
      let m = pointmap[tag]
      let angle1, angle2
      let pcenter = m[0].p1
      if (m.length === 2) {
        let end1 = m[0].p2
        let end2 = m[1].p2
        angle1 = end1.minus(pcenter).angleDegrees()
        angle2 = end2.minus(pcenter).angleDegrees()
        if (angle2 < angle1) angle2 += 360
        if (angle2 >= (angle1 + 360)) angle2 -= 360
        if (angle2 < angle1 + 180) {
          let t = angle2
          angle2 = angle1 + 360
          angle1 = t
        }
        angle1 += 90
        angle2 -= 90
      } else {
        angle1 = 0
        angle2 = 360
      }
      let fullcircle = (angle2 > angle1 + 359.999)
      if (fullcircle) {
        angle1 = 0
        angle2 = 360
      }
      if (angle2 > (angle1 + angleEPS)) {
        let points = []
        if (!fullcircle) {
          points.push(pcenter)
        }
        let numsteps = Math.round(resolution * (angle2 - angle1) / 360)
        if (numsteps < 1) numsteps = 1
        for (let step = 0; step <= numsteps; step++) {
          let angle = angle1 + step / numsteps * (angle2 - angle1)
          if (step === numsteps) angle = angle2 // prevent rounding errors
          let point = pcenter.plus(Vector2D.fromAngleDegrees(angle).times(radius))
          if ((!fullcircle) || (step > 0)) {
            points.push(point)
          }
        }
        let newcag = CAG.fromPointsNoCheck(points)
        cags.push(newcag)
      }
    }
    let result = new CAG()
    result = result.union(cags)
    return result
  },

  expand: function (radius, resolution) {
    let result = this.union(this.expandedShell(radius, resolution))
    return result
  },

  contract: function (radius, resolution) {
    let result = this.subtract(this.expandedShell(radius, resolution))
    return result
  },

    // extrude the CAG in a certain plane.
    // Giving just a plane is not enough, multiple different extrusions in the same plane would be possible
    // by rotating around the plane's origin. An additional right-hand vector should be specified as well,
    // and this is exactly a OrthoNormalBasis.
    //
    // orthonormalbasis: characterizes the plane in which to extrude
    // depth: thickness of the extruded shape. Extrusion is done upwards from the plane
    //        (unless symmetrical option is set, see below)
    // options:
    //   {symmetrical: true}  // extrude symmetrically in two directions about the plane
  extrudeInOrthonormalBasis: function (orthonormalbasis, depth, options) {
        // first extrude in the regular Z plane:
    if (!(orthonormalbasis instanceof OrthoNormalBasis)) {
      throw new Error('extrudeInPlane: the first parameter should be a OrthoNormalBasis')
    }
    let extruded = this.extrude({
      offset: [0, 0, depth]
    })
    if (parseOptionAsBool(options, 'symmetrical', false)) {
      extruded = extruded.translate([0, 0, -depth / 2])
    }
    let matrix = orthonormalbasis.getInverseProjectionMatrix()
    extruded = extruded.transform(matrix)
    return extruded
  },

    // Extrude in a standard cartesian plane, specified by two axis identifiers. Each identifier can be
    // one of ["X","Y","Z","-X","-Y","-Z"]
    // The 2d x axis will map to the first given 3D axis, the 2d y axis will map to the second.
    // See OrthoNormalBasis.GetCartesian for details.
    // options:
    //   {symmetrical: true}  // extrude symmetrically in two directions about the plane
  extrudeInPlane: function (axis1, axis2, depth, options) {
    return this.extrudeInOrthonormalBasis(OrthoNormalBasis.GetCartesian(axis1, axis2), depth, options)
  },

    // extruded=cag.extrude({offset: [0,0,10], twistangle: 360, twiststeps: 100});
    // linear extrusion of 2D shape, with optional twist
    // The 2d shape is placed in in z=0 plane and extruded into direction <offset> (a Vector3D)
    // The final face is rotated <twistangle> degrees. Rotation is done around the origin of the 2d shape (i.e. x=0, y=0)
    // twiststeps determines the resolution of the twist (should be >= 1)
    // returns a CSG object
  extrude: function (options) {
    const CSG = require('./CSG') // FIXME: circular dependencies CAG=>CSG=>CAG
    if (this.sides.length === 0) {
            // empty!
      return new CSG()
    }
    let offsetVector = parseOptionAs3DVector(options, 'offset', [0, 0, 1])
    let twistangle = parseOptionAsFloat(options, 'twistangle', 0)
    let twiststeps = parseOptionAsInt(options, 'twiststeps', defaultResolution3D)
    if (offsetVector.z === 0) {
      throw new Error('offset cannot be orthogonal to Z axis')
    }
    if (twistangle === 0 || twiststeps < 1) {
      twiststeps = 1
    }
    let normalVector = Vector3D.Create(0, 1, 0)

    let polygons = []
        // bottom and top
    polygons = polygons.concat(this._toPlanePolygons({
      translation: [0, 0, 0],
      normalVector: normalVector,
      flipped: !(offsetVector.z < 0)}
    ))
    polygons = polygons.concat(this._toPlanePolygons({
      translation: offsetVector,
      normalVector: normalVector.rotateZ(twistangle),
      flipped: offsetVector.z < 0}))
        // walls
    for (let i = 0; i < twiststeps; i++) {
      let c1 = new Connector(offsetVector.times(i / twiststeps), [0, 0, offsetVector.z],
                normalVector.rotateZ(i * twistangle / twiststeps))
      let c2 = new Connector(offsetVector.times((i + 1) / twiststeps), [0, 0, offsetVector.z],
                normalVector.rotateZ((i + 1) * twistangle / twiststeps))
      polygons = polygons.concat(this._toWallPolygons({toConnector1: c1, toConnector2: c2}))
    }

    return CSG.fromPolygons(polygons)
  },

    /** Extrude to into a 3D solid by rotating the origin around the Y axis.
     * (and turning everything into XY plane)
     * @param {Object} options - options for construction
     * @param {Number} [options.angle=360] - angle of rotation
     * @param {Number} [options.resolution=defaultResolution3D] - number of polygons per 360 degree revolution
     * @returns {CSG} new 3D solid
     */
  rotateExtrude: function (options) { // FIXME options should be optional
    const CSG = require('./CSG') // FIXME: circular dependencies CAG=>CSG=>CAG
    let alpha = parseOptionAsFloat(options, 'angle', 360)
    let resolution = parseOptionAsInt(options, 'resolution', defaultResolution3D)

    alpha = alpha > 360 ? alpha % 360 : alpha
    let origin = [0, 0, 0]
    let axisV = Vector3D.Create(0, 1, 0)
    let normalV = [0, 0, 1]
    let polygons = []
        // planes only needed if alpha > 0
    let connS = new Connector(origin, axisV, normalV)
    if (alpha > 0 && alpha < 360) {
            // we need to rotate negative to satisfy wall function condition of
            // building in the direction of axis vector
      let connE = new Connector(origin, axisV.rotateZ(-alpha), normalV)
      polygons = polygons.concat(
                this._toPlanePolygons({toConnector: connS, flipped: true}))
      polygons = polygons.concat(
                this._toPlanePolygons({toConnector: connE}))
    }
    let connT1 = connS
    let connT2
    let step = alpha / resolution
    for (let a = step; a <= alpha + EPS; a += step) { // FIXME Should this be angelEPS?
      connT2 = new Connector(origin, axisV.rotateZ(-a), normalV)
      polygons = polygons.concat(this._toWallPolygons(
                {toConnector1: connT1, toConnector2: connT2}))
      connT1 = connT2
    }
    return CSG.fromPolygons(polygons).reTesselated()
  },

    // check if we are a valid CAG (for debugging)
    // NOTE(bebbi) uneven side count doesn't work because rounding with EPS isn't taken into account
  check: function () {
    let errors = []
    if (this.isSelfIntersecting(true)) {
      errors.push('Self intersects')
    }
    let pointcount = {}
    this.sides.map(function (side) {
      function mappoint (p) {
        let tag = p.x + ' ' + p.y
        if (!(tag in pointcount)) pointcount[tag] = 0
        pointcount[tag] ++
      }
      mappoint(side.vertex0.pos)
      mappoint(side.vertex1.pos)
    })
    for (let tag in pointcount) {
      let count = pointcount[tag]
      if (count & 1) {
        errors.push('Uneven number of sides (' + count + ') for point ' + tag)
      }
    }
    let area = this.area()
    if (area < areaEPS) {
      errors.push('Area is ' + area)
    }
    if (errors.length > 0) {
      let ertxt = ''
      errors.map(function (err) {
        ertxt += err + '\n'
      })
      throw new Error(ertxt)
    }
  },

  canonicalized: function () {
    if (this.isCanonicalized) {
      return this
    } else {
      let factory = new FuzzyCAGFactory()
      let result = CAGFromCAGFuzzyFactory(factory, this)
      result.isCanonicalized = true
      return result
    }
  },

  /** Convert to compact binary form.
   * See CAG.fromCompactBinary.
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
  },

  getOutlinePaths: function () {
    let cag = this.canonicalized()
    let sideTagToSideMap = {}
    let startVertexTagToSideTagMap = {}
    cag.sides.map(function (side) {
      let sidetag = side.getTag()
      sideTagToSideMap[sidetag] = side
      let startvertextag = side.vertex0.getTag()
      if (!(startvertextag in startVertexTagToSideTagMap)) {
        startVertexTagToSideTagMap[startvertextag] = []
      }
      startVertexTagToSideTagMap[startvertextag].push(sidetag)
    })
    let paths = []
    while (true) {
      let startsidetag = null
      for (let aVertexTag in startVertexTagToSideTagMap) {
        let sidesForThisVertex = startVertexTagToSideTagMap[aVertexTag]
        startsidetag = sidesForThisVertex[0]
        sidesForThisVertex.splice(0, 1)
        if (sidesForThisVertex.length === 0) {
          delete startVertexTagToSideTagMap[aVertexTag]
        }
        break
      }
      if (startsidetag === null) break // we've had all sides
      let connectedVertexPoints = []
      let sidetag = startsidetag
      let thisside = sideTagToSideMap[sidetag]
      let startvertextag = thisside.vertex0.getTag()
      while (true) {
        connectedVertexPoints.push(thisside.vertex0.pos)
        let nextvertextag = thisside.vertex1.getTag()
        if (nextvertextag === startvertextag) break // we've closed the polygon
        if (!(nextvertextag in startVertexTagToSideTagMap)) {
          throw new Error('Area is not closed!')
        }
        let nextpossiblesidetags = startVertexTagToSideTagMap[nextvertextag]
        let nextsideindex = -1
        if (nextpossiblesidetags.length === 1) {
          nextsideindex = 0
        } else {
                    // more than one side starting at the same vertex. This means we have
                    // two shapes touching at the same corner
          let bestangle = null
          let thisangle = thisside.direction().angleDegrees()
          for (let sideindex = 0; sideindex < nextpossiblesidetags.length; sideindex++) {
            let nextpossiblesidetag = nextpossiblesidetags[sideindex]
            let possibleside = sideTagToSideMap[nextpossiblesidetag]
            let angle = possibleside.direction().angleDegrees()
            let angledif = angle - thisangle
            if (angledif < -180) angledif += 360
            if (angledif >= 180) angledif -= 360
            if ((nextsideindex < 0) || (angledif > bestangle)) {
              nextsideindex = sideindex
              bestangle = angledif
            }
          }
        }
        let nextsidetag = nextpossiblesidetags[nextsideindex]
        nextpossiblesidetags.splice(nextsideindex, 1)
        if (nextpossiblesidetags.length === 0) {
          delete startVertexTagToSideTagMap[nextvertextag]
        }
        thisside = sideTagToSideMap[nextsidetag]
      } // inner loop
            // due to the logic of CAG.fromPoints()
            // move the first point to the last
      if (connectedVertexPoints.length > 0) {
        connectedVertexPoints.push(connectedVertexPoints.shift())
      }
      let path = new Path2D(connectedVertexPoints, true)
      paths.push(path)
    } // outer loop
    return paths
  },

    /*
    cag = cag.overCutInsideCorners(cutterradius);

    Using a CNC router it's impossible to cut out a true sharp inside corner. The inside corner
    will be rounded due to the radius of the cutter. This function compensates for this by creating
    an extra cutout at each inner corner so that the actual cut out shape will be at least as large
    as needed.
    */
  overCutInsideCorners: function (cutterradius) {
    let cag = this.canonicalized()
        // for each vertex determine the 'incoming' side and 'outgoing' side:
    let pointmap = {} // tag => {pos: coord, from: [], to: []}
    cag.sides.map(function (side) {
      if (!(side.vertex0.getTag() in pointmap)) {
        pointmap[side.vertex0.getTag()] = {
          pos: side.vertex0.pos,
          from: [],
          to: []
        }
      }
      pointmap[side.vertex0.getTag()].to.push(side.vertex1.pos)
      if (!(side.vertex1.getTag() in pointmap)) {
        pointmap[side.vertex1.getTag()] = {
          pos: side.vertex1.pos,
          from: [],
          to: []
        }
      }
      pointmap[side.vertex1.getTag()].from.push(side.vertex0.pos)
    })
        // overcut all sharp corners:
    let cutouts = []
    for (let pointtag in pointmap) {
      let pointobj = pointmap[pointtag]
      if ((pointobj.from.length === 1) && (pointobj.to.length === 1)) {
                // ok, 1 incoming side and 1 outgoing side:
        let fromcoord = pointobj.from[0]
        let pointcoord = pointobj.pos
        let tocoord = pointobj.to[0]
        let v1 = pointcoord.minus(fromcoord).unit()
        let v2 = tocoord.minus(pointcoord).unit()
        let crossproduct = v1.cross(v2)
        let isInnerCorner = (crossproduct < 0.001)
        if (isInnerCorner) {
                    // yes it's a sharp corner:
          let alpha = v2.angleRadians() - v1.angleRadians() + Math.PI
          if (alpha < 0) {
            alpha += 2 * Math.PI
          } else if (alpha >= 2 * Math.PI) {
            alpha -= 2 * Math.PI
          }
          let midvector = v2.minus(v1).unit()
          let circlesegmentangle = 30 / 180 * Math.PI // resolution of the circle: segments of 30 degrees
                    // we need to increase the radius slightly so that our imperfect circle will contain a perfect circle of cutterradius
          let radiuscorrected = cutterradius / Math.cos(circlesegmentangle / 2)
          let circlecenter = pointcoord.plus(midvector.times(radiuscorrected))
                    // we don't need to create a full circle; a pie is enough. Find the angles for the pie:
          let startangle = alpha + midvector.angleRadians()
          let deltaangle = 2 * (Math.PI - alpha)
          let numsteps = 2 * Math.ceil(deltaangle / circlesegmentangle / 2) // should be even
                    // build the pie:
          let points = [circlecenter]
          for (let i = 0; i <= numsteps; i++) {
            let angle = startangle + i / numsteps * deltaangle
            let p = Vector2D.fromAngleRadians(angle).times(radiuscorrected).plus(circlecenter)
            points.push(p)
          }
          cutouts.push(CAG.fromPoints(points))
        }
      }
    }
    let result = cag.subtract(cutouts)
    return result
  }
}

module.exports = CAG
