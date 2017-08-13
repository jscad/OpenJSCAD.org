const Vector3D = require('./Vector3')
const Vertex = require('./Vertex3')
const Matrix4x4 = require('./Matrix4')
const {_CSGDEBUG, EPS, getTag, areaEPS} = require('../constants')
const {fnSortByIndex} = require('../utils')

/** Class Polygon
 * Represents a convex polygon. The vertices used to initialize a polygon must
 *   be coplanar and form a convex loop. They do not have to be `Vertex`
 *   instances but they must behave similarly (duck typing can be used for
 *   customization).
 * <br>
 * Each convex polygon has a `shared` property, which is shared between all
 *   polygons that are clones of each other or were split from the same polygon.
 *   This can be used to define per-polygon properties (such as surface color).
 * <br>
 * The plane of the polygon is calculated from the vertex coordinates if not provided.
 *   The plane can alternatively be passed as the third argument to avoid calculations.
 *
 * @constructor
 * @param {Vertex[]} vertices - list of vertices
 * @param {Polygon.Shared} [shared=defaultShared] - shared property to apply
 * @param {Plane} [plane] - plane of the polygon
 *
 * @example
 * const vertices = [
 *   new CSG.Vertex(new CSG.Vector3D([0, 0, 0])),
 *   new CSG.Vertex(new CSG.Vector3D([0, 10, 0])),
 *   new CSG.Vertex(new CSG.Vector3D([0, 10, 10]))
 * ]
 * let observed = new Polygon(vertices)
 */
let Polygon = function (vertices, shared, plane) {
  this.vertices = vertices
  if (!shared) shared = Polygon.defaultShared
  this.shared = shared
    // let numvertices = vertices.length;

  if (arguments.length >= 3) {
    this.plane = plane
  } else {
    const Plane = require('./Plane') // FIXME: circular dependencies
    this.plane = Plane.fromVector3Ds(vertices[0].pos, vertices[1].pos, vertices[2].pos)
  }

  if (_CSGDEBUG) {
    if (!this.checkIfConvex()) {
      throw new Error('Not convex!')
    }
  }
}

// create from an untyped object with identical property names:
Polygon.fromObject = function (obj) {
  const Plane = require('./Plane') // FIXME: circular dependencies
  let vertices = obj.vertices.map(function (v) {
    return Vertex.fromObject(v)
  })
  let shared = Polygon.Shared.fromObject(obj.shared)
  let plane = Plane.fromObject(obj.plane)
  return new Polygon(vertices, shared, plane)
}

Polygon.prototype = {
  /** Check whether the polygon is convex. (it should be, otherwise we will get unexpected results)
   * @returns {boolean}
   */
  checkIfConvex: function () {
    return Polygon.verticesConvex(this.vertices, this.plane.normal)
  },

  // FIXME what? why does this return this, and not a new polygon?
  // FIXME is this used?
  setColor: function (args) {
    let newshared = Polygon.Shared.fromColor.apply(this, arguments)
    this.shared = newshared
    return this
  },

  getSignedVolume: function () {
    let signedVolume = 0
    for (let i = 0; i < this.vertices.length - 2; i++) {
      signedVolume += this.vertices[0].pos.dot(this.vertices[i + 1].pos
                .cross(this.vertices[i + 2].pos))
    }
    signedVolume /= 6
    return signedVolume
  },

    // Note: could calculate vectors only once to speed up
  getArea: function () {
    let polygonArea = 0
    for (let i = 0; i < this.vertices.length - 2; i++) {
      polygonArea += this.vertices[i + 1].pos.minus(this.vertices[0].pos)
                .cross(this.vertices[i + 2].pos.minus(this.vertices[i + 1].pos)).length()
    }
    polygonArea /= 2
    return polygonArea
  },

    // accepts array of features to calculate
    // returns array of results
  getTetraFeatures: function (features) {
    let result = []
    features.forEach(function (feature) {
      if (feature === 'volume') {
        result.push(this.getSignedVolume())
      } else if (feature === 'area') {
        result.push(this.getArea())
      }
    }, this)
    return result
  },

    // Extrude a polygon into the direction offsetvector
    // Returns a CSG object
  extrude: function (offsetvector) {
    const CSG = require('../CSG') // because of circular dependencies

    let newpolygons = []

    let polygon1 = this
    let direction = polygon1.plane.normal.dot(offsetvector)
    if (direction > 0) {
      polygon1 = polygon1.flipped()
    }
    newpolygons.push(polygon1)
    let polygon2 = polygon1.translate(offsetvector)
    let numvertices = this.vertices.length
    for (let i = 0; i < numvertices; i++) {
      let sidefacepoints = []
      let nexti = (i < (numvertices - 1)) ? i + 1 : 0
      sidefacepoints.push(polygon1.vertices[i].pos)
      sidefacepoints.push(polygon2.vertices[i].pos)
      sidefacepoints.push(polygon2.vertices[nexti].pos)
      sidefacepoints.push(polygon1.vertices[nexti].pos)
      let sidefacepolygon = Polygon.createFromPoints(sidefacepoints, this.shared)
      newpolygons.push(sidefacepolygon)
    }
    polygon2 = polygon2.flipped()
    newpolygons.push(polygon2)
    return CSG.fromPolygons(newpolygons)
  },

  translate: function (offset) {
    return this.transform(Matrix4x4.translation(offset))
  },

    // returns an array with a Vector3D (center point) and a radius
  boundingSphere: function () {
    if (!this.cachedBoundingSphere) {
      let box = this.boundingBox()
      let middle = box[0].plus(box[1]).times(0.5)
      let radius3 = box[1].minus(middle)
      let radius = radius3.length()
      this.cachedBoundingSphere = [middle, radius]
    }
    return this.cachedBoundingSphere
  },

    // returns an array of two Vector3Ds (minimum coordinates and maximum coordinates)
  boundingBox: function () {
    if (!this.cachedBoundingBox) {
      let minpoint, maxpoint
      let vertices = this.vertices
      let numvertices = vertices.length
      if (numvertices === 0) {
        minpoint = new Vector3D(0, 0, 0)
      } else {
        minpoint = vertices[0].pos
      }
      maxpoint = minpoint
      for (let i = 1; i < numvertices; i++) {
        let point = vertices[i].pos
        minpoint = minpoint.min(point)
        maxpoint = maxpoint.max(point)
      }
      this.cachedBoundingBox = [minpoint, maxpoint]
    }
    return this.cachedBoundingBox
  },

  flipped: function () {
    let newvertices = this.vertices.map(function (v) {
      return v.flipped()
    })
    newvertices.reverse()
    let newplane = this.plane.flipped()
    return new Polygon(newvertices, this.shared, newplane)
  },

    // Affine transformation of polygon. Returns a new Polygon
  transform: function (matrix4x4) {
    let newvertices = this.vertices.map(function (v) {
      return v.transform(matrix4x4)
    })
    let newplane = this.plane.transform(matrix4x4)
    if (matrix4x4.isMirroring()) {
            // need to reverse the vertex order
            // in order to preserve the inside/outside orientation:
      newvertices.reverse()
    }
    return new Polygon(newvertices, this.shared, newplane)
  },

  toString: function () {
    let result = 'Polygon plane: ' + this.plane.toString() + '\n'
    this.vertices.map(function (vertex) {
      result += '  ' + vertex.toString() + '\n'
    })
    return result
  },

    // project the 3D polygon onto a plane
  projectToOrthoNormalBasis: function (orthobasis) {
    const CAG = require('../CAG')
    const {fromPointsNoCheck} = require('../CAGFactories') // circular dependencies
    let points2d = this.vertices.map(function (vertex) {
      return orthobasis.to2D(vertex.pos)
    })

    let result = fromPointsNoCheck(points2d)
    let area = result.area()
    if (Math.abs(area) < areaEPS) {
            // the polygon was perpendicular to the orthnormal plane. The resulting 2D polygon would be degenerate
            // return an empty area instead:
      result = new CAG()
    } else if (area < 0) {
      result = result.flipped()
    }
    return result
  },

  //FIXME: WHY is this for 3D polygons and not for 2D shapes ?
    /**
     * Creates solid from slices (Polygon) by generating walls
     * @param {Object} options Solid generating options
     *  - numslices {Number} Number of slices to be generated
     *  - callback(t, slice) {Function} Callback function generating slices.
     *          arguments: t = [0..1], slice = [0..numslices - 1]
     *          return: Polygon or null to skip
     *  - loop {Boolean} no flats, only walls, it's used to generate solids like a tor
     */
  solidFromSlices: function (options) {
    const CSG = require('../CSG')

    let polygons = [],
      csg = null,
      prev = null,
      bottom = null,
      top = null,
      numSlices = 2,
      bLoop = false,
      fnCallback,
      flipped = null

    if (options) {
      bLoop = Boolean(options['loop'])

      if (options.numslices) { numSlices = options.numslices }

      if (options.callback) {
        fnCallback = options.callback
      }
    }
    if (!fnCallback) {
      let square = new Polygon.createFromPoints([
                [0, 0, 0],
                [1, 0, 0],
                [1, 1, 0],
                [0, 1, 0]
      ])
      fnCallback = function (t, slice) {
        return t === 0 || t === 1 ? square.translate([0, 0, t]) : null
      }
    }
    for (let i = 0, iMax = numSlices - 1; i <= iMax; i++) {
      csg = fnCallback.call(this, i / iMax, i)
      if (csg) {
        if (!(csg instanceof Polygon)) {
          throw new Error('Polygon.solidFromSlices callback error: Polygon expected')
        }
        csg.checkIfConvex()

        if (prev) { // generate walls
          if (flipped === null) { // not generated yet
            flipped = prev.plane.signedDistanceToPoint(csg.vertices[0].pos) < 0
          }
          this._addWalls(polygons, prev, csg, flipped)
        } else { // the first - will be a bottom
          bottom = csg
        }
        prev = csg
      } // callback can return null to skip that slice
    }
    top = csg

    if (bLoop) {
      let bSameTopBottom = bottom.vertices.length === top.vertices.length &&
                bottom.vertices.every(function (v, index) {
                  return v.pos.equals(top.vertices[index].pos)
                })
            // if top and bottom are not the same -
            // generate walls between them
      if (!bSameTopBottom) {
        this._addWalls(polygons, top, bottom, flipped)
      } // else - already generated
    } else {
            // save top and bottom
            // TODO: flip if necessary
      polygons.unshift(flipped ? bottom : bottom.flipped())
      polygons.push(flipped ? top.flipped() : top)
    }
    return CSG.fromPolygons(polygons)
  },
    /**
     *
     * @param walls Array of wall polygons
     * @param bottom Bottom polygon
     * @param top Top polygon
     */
  _addWalls: function (walls, bottom, top, bFlipped) {
    let bottomPoints = bottom.vertices.slice(0) // make a copy
    let topPoints = top.vertices.slice(0) // make a copy
    let color = top.shared || null

        // check if bottom perimeter is closed
    if (!bottomPoints[0].pos.equals(bottomPoints[bottomPoints.length - 1].pos)) {
      bottomPoints.push(bottomPoints[0])
    }

        // check if top perimeter is closed
    if (!topPoints[0].pos.equals(topPoints[topPoints.length - 1].pos)) {
      topPoints.push(topPoints[0])
    }
    if (bFlipped) {
      bottomPoints = bottomPoints.reverse()
      topPoints = topPoints.reverse()
    }

    let iTopLen = topPoints.length - 1
    let iBotLen = bottomPoints.length - 1
    let iExtra = iTopLen - iBotLen// how many extra triangles we need
    let bMoreTops = iExtra > 0
    let bMoreBottoms = iExtra < 0

    let aMin = [] // indexes to start extra triangles (polygon with minimal square)
        // init - we need exactly /iExtra/ small triangles
    for (let i = Math.abs(iExtra); i > 0; i--) {
      aMin.push({
        len: Infinity,
        index: -1
      })
    }

    let len
    if (bMoreBottoms) {
      for (let i = 0; i < iBotLen; i++) {
        len = bottomPoints[i].pos.distanceToSquared(bottomPoints[i + 1].pos)
                // find the element to replace
        for (let j = aMin.length - 1; j >= 0; j--) {
          if (aMin[j].len > len) {
            aMin[j].len = len
            aMin.index = j
            break
          }
        } // for
      }
    } else if (bMoreTops) {
      for (let i = 0; i < iTopLen; i++) {
        len = topPoints[i].pos.distanceToSquared(topPoints[i + 1].pos)
                // find the element to replace
        for (let j = aMin.length - 1; j >= 0; j--) {
          if (aMin[j].len > len) {
            aMin[j].len = len
            aMin.index = j
            break
          }
        } // for
      }
    } // if
        // sort by index
    aMin.sort(fnSortByIndex)
    let getTriangle = function addWallsPutTriangle (pointA, pointB, pointC, color) {
      return new Polygon([pointA, pointB, pointC], color)
            // return bFlipped ? triangle.flipped() : triangle;
    }

    let bpoint = bottomPoints[0]
    let tpoint = topPoints[0]
    let secondPoint
    let nBotFacet
    let nTopFacet // length of triangle facet side
    for (let iB = 0, iT = 0, iMax = iTopLen + iBotLen; iB + iT < iMax;) {
      if (aMin.length) {
        if (bMoreTops && iT === aMin[0].index) { // one vertex is on the bottom, 2 - on the top
          secondPoint = topPoints[++iT]
                    // console.log('<<< extra top: ' + secondPoint + ', ' + tpoint + ', bottom: ' + bpoint);
          walls.push(getTriangle(
                        secondPoint, tpoint, bpoint, color
                    ))
          tpoint = secondPoint
          aMin.shift()
          continue
        } else if (bMoreBottoms && iB === aMin[0].index) {
          secondPoint = bottomPoints[++iB]
          walls.push(getTriangle(
                        tpoint, bpoint, secondPoint, color
                    ))
          bpoint = secondPoint
          aMin.shift()
          continue
        }
      }
            // choose the shortest path
      if (iB < iBotLen) { // one vertex is on the top, 2 - on the bottom
        nBotFacet = tpoint.pos.distanceToSquared(bottomPoints[iB + 1].pos)
      } else {
        nBotFacet = Infinity
      }
      if (iT < iTopLen) { // one vertex is on the bottom, 2 - on the top
        nTopFacet = bpoint.pos.distanceToSquared(topPoints[iT + 1].pos)
      } else {
        nTopFacet = Infinity
      }
      if (nBotFacet <= nTopFacet) {
        secondPoint = bottomPoints[++iB]
        walls.push(getTriangle(
                    tpoint, bpoint, secondPoint, color
                ))
        bpoint = secondPoint
      } else if (iT < iTopLen) { // nTopFacet < Infinity
        secondPoint = topPoints[++iT]
                // console.log('<<< top: ' + secondPoint + ', ' + tpoint + ', bottom: ' + bpoint);
        walls.push(getTriangle(
                    secondPoint, tpoint, bpoint, color
                ))
        tpoint = secondPoint
      };
    }
    return walls
  }
}

Polygon.verticesConvex = function (vertices, planenormal) {
  let numvertices = vertices.length
  if (numvertices > 2) {
    let prevprevpos = vertices[numvertices - 2].pos
    let prevpos = vertices[numvertices - 1].pos
    for (let i = 0; i < numvertices; i++) {
      let pos = vertices[i].pos
      if (!Polygon.isConvexPoint(prevprevpos, prevpos, pos, planenormal)) {
        return false
      }
      prevprevpos = prevpos
      prevpos = pos
    }
  }
  return true
}

/** Create a polygon from the given points.
 *
 * @param {Array[]} points - list of points
 * @param {Polygon.Shared} [shared=defaultShared] - shared property to apply
 * @param {Plane} [plane] - plane of the polygon
 *
 * @example
 * const points = [
 *   [0,  0, 0],
 *   [0, 10, 0],
 *   [0, 10, 10]
 * ]
 * let observed = CSG.Polygon.createFromPoints(points)
 */
Polygon.createFromPoints = function (points, shared, plane) {
  let vertices = []
  points.map(function (p) {
    let vec = new Vector3D(p)
    let vertex = new Vertex(vec)
    vertices.push(vertex)
  })
  let polygon
  if (arguments.length < 3) {
    polygon = new Polygon(vertices, shared)
  } else {
    polygon = new Polygon(vertices, shared, plane)
  }
  return polygon
}

// calculate whether three points form a convex corner
//  prevpoint, point, nextpoint: the 3 coordinates (Vector3D instances)
//  normal: the normal vector of the plane
Polygon.isConvexPoint = function (prevpoint, point, nextpoint, normal) {
  let crossproduct = point.minus(prevpoint).cross(nextpoint.minus(point))
  let crossdotnormal = crossproduct.dot(normal)
  return (crossdotnormal >= 0)
}

Polygon.isStrictlyConvexPoint = function (prevpoint, point, nextpoint, normal) {
  let crossproduct = point.minus(prevpoint).cross(nextpoint.minus(point))
  let crossdotnormal = crossproduct.dot(normal)
  return (crossdotnormal >= EPS)
}

/** Class Polygon.Shared
 * Holds the shared properties for each polygon (Currently only color).
 * @constructor
 * @param {Array[]} color - array containing RGBA values, or null
 *
 * @example
 *   let shared = new CSG.Polygon.Shared([0, 0, 0, 1])
 */
Polygon.Shared = function (color) {
  if (color !== null) {
    if (color.length !== 4) {
      throw new Error('Expecting 4 element array')
    }
  }
  this.color = color
}

Polygon.Shared.fromObject = function (obj) {
  return new Polygon.Shared(obj.color)
}

/** Create Polygon.Shared from color values.
 * @param {number} r - value of RED component
 * @param {number} g - value of GREEN component
 * @param {number} b - value of BLUE component
 * @param {number} [a] - value of ALPHA component
 * @param {Array[]} [color] - OR array containing RGB values (optional Alpha)
 *
 * @example
 * let s1 = Polygon.Shared.fromColor(0,0,0)
 * let s2 = Polygon.Shared.fromColor([0,0,0,1])
 */
Polygon.Shared.fromColor = function (args) {
  let color
  if (arguments.length === 1) {
    color = arguments[0].slice() // make deep copy
  } else {
    color = []
    for (let i = 0; i < arguments.length; i++) {
      color.push(arguments[i])
    }
  }
  if (color.length === 3) {
    color.push(1)
  } else if (color.length !== 4) {
    throw new Error('setColor expects either an array with 3 or 4 elements, or 3 or 4 parameters.')
  }
  return new Polygon.Shared(color)
}

Polygon.Shared.prototype = {
  getTag: function () {
    let result = this.tag
    if (!result) {
      result = getTag()
      this.tag = result
    }
    return result
  },
    // get a string uniquely identifying this object
  getHash: function () {
    if (!this.color) return 'null'
    return this.color.join('/')
  }
}

Polygon.defaultShared = new Polygon.Shared(null)

module.exports = Polygon
