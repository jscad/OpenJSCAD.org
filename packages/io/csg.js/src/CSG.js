const {fnNumberSort} = require('./utils')
const FuzzyCSGFactory = require('./FuzzyFactory3d')
const Tree = require('./trees')
const {EPS} = require('./constants')
const {reTesselateCoplanarPolygons} = require('./math/polygonUtils')
const Polygon = require('./math/Polygon3')
const Plane = require('./math/Plane')
const Vertex = require('./math/Vertex3')
const Vector2D = require('./math/Vector2')
const Vector3D = require('./math/Vector3')
const Matrix4x4 = require('./math/Matrix4')
const OrthoNormalBasis = require('./math/OrthoNormalBasis')

const CAG = require('./CAG') // FIXME: circular dependency !

const Properties = require('./Properties')
const {Connector} = require('./connectors')
const fixTJunctions = require('./utils/fixTJunctions')
// let {fromPolygons} = require('./CSGMakers') // FIXME: circular dependency !

/** Class CSG
 * Holds a binary space partition tree representing a 3D solid. Two solids can
 * be combined using the `union()`, `subtract()`, and `intersect()` methods.
 * @constructor
 */
let CSG = function () {
  this.polygons = []
  this.properties = new Properties()
  this.isCanonicalized = true
  this.isRetesselated = true
}

CSG.prototype = {
  /** @return {Polygon[]} The list of polygons. */
  toPolygons: function () {
    return this.polygons
  },

  /**
   * Return a new CSG solid representing the space in either this solid or
   * in the given solids. Neither this solid nor the given solids are modified.
   * @param {CSG[]} csg - list of CSG objects
   * @returns {CSG} new CSG object
   * @example
   * let C = A.union(B)
   * @example
   * +-------+            +-------+
   * |       |            |       |
   * |   A   |            |       |
   * |    +--+----+   =   |       +----+
   * +----+--+    |       +----+       |
   *      |   B   |            |       |
   *      |       |            |       |
   *      +-------+            +-------+
   */
  union: function (csg) {
    let csgs
    if (csg instanceof Array) {
      csgs = csg.slice(0)
      csgs.push(this)
    } else {
      csgs = [this, csg]
    }

    let i
    // combine csg pairs in a way that forms a balanced binary tree pattern
    for (i = 1; i < csgs.length; i += 2) {
      csgs.push(csgs[i - 1].unionSub(csgs[i]))
    }
    return csgs[i - 1].reTesselated().canonicalized()
  },

  unionSub: function (csg, retesselate, canonicalize) {
    if (!this.mayOverlap(csg)) {
      return this.unionForNonIntersecting(csg)
    } else {
      let a = new Tree(this.polygons)
      let b = new Tree(csg.polygons)
      a.clipTo(b, false)

            // b.clipTo(a, true); // ERROR: this doesn't work
      b.clipTo(a)
      b.invert()
      b.clipTo(a)
      b.invert()

      let newpolygons = a.allPolygons().concat(b.allPolygons())
      let result = CSG.fromPolygons(newpolygons)
      result.properties = this.properties._merge(csg.properties)
      if (retesselate) result = result.reTesselated()
      if (canonicalize) result = result.canonicalized()
      return result
    }
  },

    // Like union, but when we know that the two solids are not intersecting
    // Do not use if you are not completely sure that the solids do not intersect!
  unionForNonIntersecting: function (csg) {
    let newpolygons = this.polygons.concat(csg.polygons)
    let result = CSG.fromPolygons(newpolygons)
    result.properties = this.properties._merge(csg.properties)
    result.isCanonicalized = this.isCanonicalized && csg.isCanonicalized
    result.isRetesselated = this.isRetesselated && csg.isRetesselated
    return result
  },

  /**
   * Return a new CSG solid representing space in this solid but
   * not in the given solids. Neither this solid nor the given solids are modified.
   * @param {CSG[]} csg - list of CSG objects
   * @returns {CSG} new CSG object
   * @example
   * let C = A.subtract(B)
   * @example
   * +-------+            +-------+
   * |       |            |       |
   * |   A   |            |       |
   * |    +--+----+   =   |    +--+
   * +----+--+    |       +----+
   *      |   B   |
   *      |       |
   *      +-------+
   */
  subtract: function (csg) {
    let csgs
    if (csg instanceof Array) {
      csgs = csg
    } else {
      csgs = [csg]
    }
    let result = this
    for (let i = 0; i < csgs.length; i++) {
      let islast = (i === (csgs.length - 1))
      result = result.subtractSub(csgs[i], islast, islast)
    }
    return result
  },

  subtractSub: function (csg, retesselate, canonicalize) {
    let a = new Tree(this.polygons)
    let b = new Tree(csg.polygons)
    a.invert()
    a.clipTo(b)
    b.clipTo(a, true)
    a.addPolygons(b.allPolygons())
    a.invert()
    let result = CSG.fromPolygons(a.allPolygons())
    result.properties = this.properties._merge(csg.properties)
    if (retesselate) result = result.reTesselated()
    if (canonicalize) result = result.canonicalized()
    return result
  },

  /**
   * Return a new CSG solid representing space in both this solid and
   * in the given solids. Neither this solid nor the given solids are modified.
   * @param {CSG[]} csg - list of CSG objects
   * @returns {CSG} new CSG object
   * @example
   * let C = A.intersect(B)
   * @example
   * +-------+
   * |       |
   * |   A   |
   * |    +--+----+   =   +--+
   * +----+--+    |       +--+
   *      |   B   |
   *      |       |
   *      +-------+
   */
  intersect: function (csg) {
    let csgs
    if (csg instanceof Array) {
      csgs = csg
    } else {
      csgs = [csg]
    }
    let result = this
    for (let i = 0; i < csgs.length; i++) {
      let islast = (i === (csgs.length - 1))
      result = result.intersectSub(csgs[i], islast, islast)
    }
    return result
  },

  intersectSub: function (csg, retesselate, canonicalize) {
    let a = new Tree(this.polygons)
    let b = new Tree(csg.polygons)
    a.invert()
    b.clipTo(a)
    b.invert()
    a.clipTo(b)
    b.clipTo(a)
    a.addPolygons(b.allPolygons())
    a.invert()
    let result = CSG.fromPolygons(a.allPolygons())
    result.properties = this.properties._merge(csg.properties)
    if (retesselate) result = result.reTesselated()
    if (canonicalize) result = result.canonicalized()
    return result
  },

  /**
   * Return a new CSG solid with solid and empty space switched.
   * This solid is not modified.
   * @returns {CSG} new CSG object
   * @example
   * let B = A.invert()
   */
  invert: function () {
    let flippedpolygons = this.polygons.map(function (p) {
      return p.flipped()
    })
    return CSG.fromPolygons(flippedpolygons)
        // TODO: flip properties?
  },

    // Affine transformation of CSG object. Returns a new CSG object
  transform1: function (matrix4x4) {
    let newpolygons = this.polygons.map(function (p) {
      return p.transform(matrix4x4)
    })
    let result = CSG.fromPolygons(newpolygons)
    result.properties = this.properties._transform(matrix4x4)
    result.isRetesselated = this.isRetesselated
    return result
  },

  /**
   * Return a new CSG solid that is transformed using the given Matrix.
   * Several matrix transformations can be combined before transforming this solid.
   * @param {CSG.Matrix4x4} matrix4x4 - matrix to be applied
   * @returns {CSG} new CSG object
   * @example
   * var m = new CSG.Matrix4x4()
   * m = m.multiply(CSG.Matrix4x4.rotationX(40))
   * m = m.multiply(CSG.Matrix4x4.translation([-.5, 0, 0]))
   * let B = A.transform(m)
   */
  transform: function (matrix4x4) {
    let ismirror = matrix4x4.isMirroring()
    let transformedvertices = {}
    let transformedplanes = {}
    let newpolygons = this.polygons.map(function (p) {
      let newplane
      let plane = p.plane
      let planetag = plane.getTag()
      if (planetag in transformedplanes) {
        newplane = transformedplanes[planetag]
      } else {
        newplane = plane.transform(matrix4x4)
        transformedplanes[planetag] = newplane
      }
      let newvertices = p.vertices.map(function (v) {
        let newvertex
        let vertextag = v.getTag()
        if (vertextag in transformedvertices) {
          newvertex = transformedvertices[vertextag]
        } else {
          newvertex = v.transform(matrix4x4)
          transformedvertices[vertextag] = newvertex
        }
        return newvertex
      })
      if (ismirror) newvertices.reverse()
      return new Polygon(newvertices, p.shared, newplane)
    })
    let result = CSG.fromPolygons(newpolygons)
    result.properties = this.properties._transform(matrix4x4)
    result.isRetesselated = this.isRetesselated
    result.isCanonicalized = this.isCanonicalized
    return result
  },

  toString: function () {
    let result = 'CSG solid:\n'
    this.polygons.map(function (p) {
      result += p.toString()
    })
    return result
  },

    // Expand the solid
    // resolution: number of points per 360 degree for the rounded corners
  expand: function (radius, resolution) {
    let result = this.expandedShell(radius, resolution, true)
    result = result.reTesselated()
    result.properties = this.properties // keep original properties
    return result
  },

    // Contract the solid
    // resolution: number of points per 360 degree for the rounded corners
  contract: function (radius, resolution) {
    let expandedshell = this.expandedShell(radius, resolution, false)
    let result = this.subtract(expandedshell)
    result = result.reTesselated()
    result.properties = this.properties // keep original properties
    return result
  },

    // cut the solid at a plane, and stretch the cross-section found along plane normal
  stretchAtPlane: function (normal, point, length) {
    let plane = Plane.fromNormalAndPoint(normal, point)
    let onb = new OrthoNormalBasis(plane)
    let crosssect = this.sectionCut(onb)
    let midpiece = crosssect.extrudeInOrthonormalBasis(onb, length)
    let piece1 = this.cutByPlane(plane)
    let piece2 = this.cutByPlane(plane.flipped())
    let result = piece1.union([midpiece, piece2.translate(plane.normal.times(length))])
    return result
  },

    // Create the expanded shell of the solid:
    // All faces are extruded to get a thickness of 2*radius
    // Cylinders are constructed around every side
    // Spheres are placed on every vertex
    // unionWithThis: if true, the resulting solid will be united with 'this' solid;
    //   the result is a true expansion of the solid
    //   If false, returns only the shell
  expandedShell: function (radius, resolution, unionWithThis) {
    // const {sphere} = require('./primitives3d') // FIXME: circular dependency !
    let csg = this.reTesselated()
    let result
    if (unionWithThis) {
      result = csg
    } else {
      result = new CSG()
    }

        // first extrude all polygons:
    csg.polygons.map(function (polygon) {
      let extrudevector = polygon.plane.normal.unit().times(2 * radius)
      let translatedpolygon = polygon.translate(extrudevector.times(-0.5))
      let extrudedface = translatedpolygon.extrude(extrudevector)
      result = result.unionSub(extrudedface, false, false)
    })

    // Make a list of all unique vertex pairs (i.e. all sides of the solid)
    // For each vertex pair we collect the following:
    //   v1: first coordinate
    //   v2: second coordinate
    //   planenormals: array of normal vectors of all planes touching this side
    let vertexpairs = {} // map of 'vertex pair tag' to {v1, v2, planenormals}
    csg.polygons.map(function (polygon) {
      let numvertices = polygon.vertices.length
      let prevvertex = polygon.vertices[numvertices - 1]
      let prevvertextag = prevvertex.getTag()
      for (let i = 0; i < numvertices; i++) {
        let vertex = polygon.vertices[i]
        let vertextag = vertex.getTag()
        let vertextagpair
        if (vertextag < prevvertextag) {
          vertextagpair = vertextag + '-' + prevvertextag
        } else {
          vertextagpair = prevvertextag + '-' + vertextag
        }
        let obj
        if (vertextagpair in vertexpairs) {
          obj = vertexpairs[vertextagpair]
        } else {
          obj = {
            v1: prevvertex,
            v2: vertex,
            planenormals: []
          }
          vertexpairs[vertextagpair] = obj
        }
        obj.planenormals.push(polygon.plane.normal)

        prevvertextag = vertextag
        prevvertex = vertex
      }
    })

        // now construct a cylinder on every side
        // The cylinder is always an approximation of a true cylinder: it will have <resolution> polygons
        // around the sides. We will make sure though that the cylinder will have an edge at every
        // face that touches this side. This ensures that we will get a smooth fill even
        // if two edges are at, say, 10 degrees and the resolution is low.
        // Note: the result is not retesselated yet but it really should be!
    for (let vertextagpair in vertexpairs) {
      let vertexpair = vertexpairs[vertextagpair]
      let startpoint = vertexpair.v1.pos
      let endpoint = vertexpair.v2.pos
                // our x,y and z vectors:
      let zbase = endpoint.minus(startpoint).unit()
      let xbase = vertexpair.planenormals[0].unit()
      let ybase = xbase.cross(zbase)

      // make a list of angles that the cylinder should traverse:
      let angles = []

            // first of all equally spaced around the cylinder:
      for (let i = 0; i < resolution; i++) {
        angles.push(i * Math.PI * 2 / resolution)
      }

            // and also at every normal of all touching planes:
      for (let i = 0, iMax = vertexpair.planenormals.length; i < iMax; i++) {
        let planenormal = vertexpair.planenormals[i]
        let si = ybase.dot(planenormal)
        let co = xbase.dot(planenormal)
        let angle = Math.atan2(si, co)

        if (angle < 0) angle += Math.PI * 2
        angles.push(angle)
        angle = Math.atan2(-si, -co)
        if (angle < 0) angle += Math.PI * 2
        angles.push(angle)
      }

            // this will result in some duplicate angles but we will get rid of those later.
            // Sort:
      angles = angles.sort(fnNumberSort)

            // Now construct the cylinder by traversing all angles:
      let numangles = angles.length
      let prevp1
      let prevp2
      let startfacevertices = []
      let endfacevertices = []
      let polygons = []
      for (let i = -1; i < numangles; i++) {
        let angle = angles[(i < 0) ? (i + numangles) : i]
        let si = Math.sin(angle)
        let co = Math.cos(angle)
        let p = xbase.times(co * radius).plus(ybase.times(si * radius))
        let p1 = startpoint.plus(p)
        let p2 = endpoint.plus(p)
        let skip = false
        if (i >= 0) {
          if (p1.distanceTo(prevp1) < EPS) {
            skip = true
          }
        }
        if (!skip) {
          if (i >= 0) {
            startfacevertices.push(new Vertex(p1))
            endfacevertices.push(new Vertex(p2))
            let polygonvertices = [
              new Vertex(prevp2),
              new Vertex(p2),
              new Vertex(p1),
              new Vertex(prevp1)
            ]
            let polygon = new Polygon(polygonvertices)
            polygons.push(polygon)
          }
          prevp1 = p1
          prevp2 = p2
        }
      }
      endfacevertices.reverse()
      polygons.push(new Polygon(startfacevertices))
      polygons.push(new Polygon(endfacevertices))
      let cylinder = CSG.fromPolygons(polygons)
      result = result.unionSub(cylinder, false, false)
    }

        // make a list of all unique vertices
        // For each vertex we also collect the list of normals of the planes touching the vertices
    let vertexmap = {}
    csg.polygons.map(function (polygon) {
      polygon.vertices.map(function (vertex) {
        let vertextag = vertex.getTag()
        let obj
        if (vertextag in vertexmap) {
          obj = vertexmap[vertextag]
        } else {
          obj = {
            pos: vertex.pos,
            normals: []
          }
          vertexmap[vertextag] = obj
        }
        obj.normals.push(polygon.plane.normal)
      })
    })

        // and build spheres at each vertex
        // We will try to set the x and z axis to the normals of 2 planes
        // This will ensure that our sphere tesselation somewhat matches 2 planes
    for (let vertextag in vertexmap) {
      let vertexobj = vertexmap[vertextag]
            // use the first normal to be the x axis of our sphere:
      let xaxis = vertexobj.normals[0].unit()
            // and find a suitable z axis. We will use the normal which is most perpendicular to the x axis:
      let bestzaxis = null
      let bestzaxisorthogonality = 0
      for (let i = 1; i < vertexobj.normals.length; i++) {
        let normal = vertexobj.normals[i].unit()
        let cross = xaxis.cross(normal)
        let crosslength = cross.length()
        if (crosslength > 0.05) {
          if (crosslength > bestzaxisorthogonality) {
            bestzaxisorthogonality = crosslength
            bestzaxis = normal
          }
        }
      }
      if (!bestzaxis) {
        bestzaxis = xaxis.randomNonParallelVector()
      }
      let yaxis = xaxis.cross(bestzaxis).unit()
      let zaxis = yaxis.cross(xaxis)
      let _sphere = CSG.sphere({
        center: vertexobj.pos,
        radius: radius,
        resolution: resolution,
        axes: [xaxis, yaxis, zaxis]
      })
      result = result.unionSub(_sphere, false, false)
    }

    return result
  },

  canonicalized: function () {
    if (this.isCanonicalized) {
      return this
    } else {
      let factory = new FuzzyCSGFactory()
      let result = CSGFromCSGFuzzyFactory(factory, this)
      result.isCanonicalized = true
      result.isRetesselated = this.isRetesselated
      result.properties = this.properties // keep original properties
      return result
    }
  },

  reTesselated: function () {
    if (this.isRetesselated) {
      return this
    } else {
      let csg = this
      let polygonsPerPlane = {}
      let isCanonicalized = csg.isCanonicalized
      let fuzzyfactory = new FuzzyCSGFactory()
      csg.polygons.map(function (polygon) {
        let plane = polygon.plane
        let shared = polygon.shared
        if (!isCanonicalized) {
          // in order to identify to polygons having the same plane, we need to canonicalize the planes
          // We don't have to do a full canonizalization (including vertices), to save time only do the planes and the shared data:
          plane = fuzzyfactory.getPlane(plane)
          shared = fuzzyfactory.getPolygonShared(shared)
        }
        let tag = plane.getTag() + '/' + shared.getTag()
        if (!(tag in polygonsPerPlane)) {
          polygonsPerPlane[tag] = [polygon]
        } else {
          polygonsPerPlane[tag].push(polygon)
        }
      })
      let destpolygons = []
      for (let planetag in polygonsPerPlane) {
        let sourcepolygons = polygonsPerPlane[planetag]
        if (sourcepolygons.length < 2) {
          destpolygons = destpolygons.concat(sourcepolygons)
        } else {
          let retesselayedpolygons = []
          reTesselateCoplanarPolygons(sourcepolygons, retesselayedpolygons)
          destpolygons = destpolygons.concat(retesselayedpolygons)
        }
      }
      let result = CSG.fromPolygons(destpolygons)
      result.isRetesselated = true
            // result = result.canonicalized();
      result.properties = this.properties // keep original properties
      return result
    }
  },

  /**
   * Returns an array of Vector3D, providing minimum coordinates and maximum coordinates
   * of this solid.
   * @returns {Vector3D[]}
   * @example
   * let bounds = A.getBounds()
   * let minX = bounds[0].x
   */
  getBounds: function () {
    if (!this.cachedBoundingBox) {
      let minpoint = new Vector3D(0, 0, 0)
      let maxpoint = new Vector3D(0, 0, 0)
      let polygons = this.polygons
      let numpolygons = polygons.length
      for (let i = 0; i < numpolygons; i++) {
        let polygon = polygons[i]
        let bounds = polygon.boundingBox()
        if (i === 0) {
          minpoint = bounds[0]
          maxpoint = bounds[1]
        } else {
          minpoint = minpoint.min(bounds[0])
          maxpoint = maxpoint.max(bounds[1])
        }
      }
      this.cachedBoundingBox = [minpoint, maxpoint]
    }
    return this.cachedBoundingBox
  },

    // returns true if there is a possibility that the two solids overlap
    // returns false if we can be sure that they do not overlap
  mayOverlap: function (csg) {
    if ((this.polygons.length === 0) || (csg.polygons.length === 0)) {
      return false
    } else {
      let mybounds = this.getBounds()
      let otherbounds = csg.getBounds()
      if (mybounds[1].x < otherbounds[0].x) return false
      if (mybounds[0].x > otherbounds[1].x) return false
      if (mybounds[1].y < otherbounds[0].y) return false
      if (mybounds[0].y > otherbounds[1].y) return false
      if (mybounds[1].z < otherbounds[0].z) return false
      if (mybounds[0].z > otherbounds[1].z) return false
      return true
    }
  },

    // Cut the solid by a plane. Returns the solid on the back side of the plane
  cutByPlane: function (plane) {
    if (this.polygons.length === 0) {
      return new CSG()
    }
        // Ideally we would like to do an intersection with a polygon of inifinite size
        // but this is not supported by our implementation. As a workaround, we will create
        // a cube, with one face on the plane, and a size larger enough so that the entire
        // solid fits in the cube.
        // find the max distance of any vertex to the center of the plane:
    let planecenter = plane.normal.times(plane.w)
    let maxdistance = 0
    this.polygons.map(function (polygon) {
      polygon.vertices.map(function (vertex) {
        let distance = vertex.pos.distanceToSquared(planecenter)
        if (distance > maxdistance) maxdistance = distance
      })
    })
    maxdistance = Math.sqrt(maxdistance)
    maxdistance *= 1.01 // make sure it's really larger
        // Now build a polygon on the plane, at any point farther than maxdistance from the plane center:
    let vertices = []
    let orthobasis = new OrthoNormalBasis(plane)
    vertices.push(new Vertex(orthobasis.to3D(new Vector2D(maxdistance, -maxdistance))))
    vertices.push(new Vertex(orthobasis.to3D(new Vector2D(-maxdistance, -maxdistance))))
    vertices.push(new Vertex(orthobasis.to3D(new Vector2D(-maxdistance, maxdistance))))
    vertices.push(new Vertex(orthobasis.to3D(new Vector2D(maxdistance, maxdistance))))
    let polygon = new Polygon(vertices, null, plane.flipped())

        // and extrude the polygon into a cube, backwards of the plane:
    let cube = polygon.extrude(plane.normal.times(-maxdistance))

        // Now we can do the intersection:
    let result = this.intersect(cube)
    result.properties = this.properties // keep original properties
    return result
  },

    // Connect a solid to another solid, such that two Connectors become connected
    //   myConnector: a Connector of this solid
    //   otherConnector: a Connector to which myConnector should be connected
    //   mirror: false: the 'axis' vectors of the connectors should point in the same direction
    //           true: the 'axis' vectors of the connectors should point in opposite direction
    //   normalrotation: degrees of rotation between the 'normal' vectors of the two
    //                   connectors
  connectTo: function (myConnector, otherConnector, mirror, normalrotation) {
    let matrix = myConnector.getTransformationTo(otherConnector, mirror, normalrotation)
    return this.transform(matrix)
  },

    // set the .shared property of all polygons
    // Returns a new CSG solid, the original is unmodified!
  setShared: function (shared) {
    let polygons = this.polygons.map(function (p) {
      return new Polygon(p.vertices, shared, p.plane)
    })
    let result = CSG.fromPolygons(polygons)
    result.properties = this.properties // keep original properties
    result.isRetesselated = this.isRetesselated
    result.isCanonicalized = this.isCanonicalized
    return result
  },

  setColor: function (args) {
    let newshared = Polygon.Shared.fromColor.apply(this, arguments)
    return this.setShared(newshared)
  },

  toCompactBinary: function () {
    let csg = this.canonicalized(),
      numpolygons = csg.polygons.length,
      numpolygonvertices = 0,
      numvertices = 0,
      vertexmap = {},
      vertices = [],
      numplanes = 0,
      planemap = {},
      polygonindex = 0,
      planes = [],
      shareds = [],
      sharedmap = {},
      numshared = 0
        // for (let i = 0, iMax = csg.polygons.length; i < iMax; i++) {
        //  let p = csg.polygons[i];
        //  for (let j = 0, jMax = p.length; j < jMax; j++) {
        //      ++numpolygonvertices;
        //      let vertextag = p[j].getTag();
        //      if(!(vertextag in vertexmap)) {
        //          vertexmap[vertextag] = numvertices++;
        //          vertices.push(p[j]);
        //      }
        //  }
    csg.polygons.map(function (p) {
      p.vertices.map(function (v) {
        ++numpolygonvertices
        let vertextag = v.getTag()
        if (!(vertextag in vertexmap)) {
          vertexmap[vertextag] = numvertices++
          vertices.push(v)
        }
      })

      let planetag = p.plane.getTag()
      if (!(planetag in planemap)) {
        planemap[planetag] = numplanes++
        planes.push(p.plane)
      }
      let sharedtag = p.shared.getTag()
      if (!(sharedtag in sharedmap)) {
        sharedmap[sharedtag] = numshared++
        shareds.push(p.shared)
      }
    })
    let numVerticesPerPolygon = new Uint32Array(numpolygons)
    let polygonSharedIndexes = new Uint32Array(numpolygons)
    let polygonVertices = new Uint32Array(numpolygonvertices)
    let polygonPlaneIndexes = new Uint32Array(numpolygons)
    let vertexData = new Float64Array(numvertices * 3)
    let planeData = new Float64Array(numplanes * 4)
    let polygonVerticesIndex = 0
    for (let polygonindex = 0; polygonindex < numpolygons; ++polygonindex) {
      let p = csg.polygons[polygonindex]
      numVerticesPerPolygon[polygonindex] = p.vertices.length
      p.vertices.map(function (v) {
        let vertextag = v.getTag()
        let vertexindex = vertexmap[vertextag]
        polygonVertices[polygonVerticesIndex++] = vertexindex
      })
      let planetag = p.plane.getTag()
      let planeindex = planemap[planetag]
      polygonPlaneIndexes[polygonindex] = planeindex
      let sharedtag = p.shared.getTag()
      let sharedindex = sharedmap[sharedtag]
      polygonSharedIndexes[polygonindex] = sharedindex
    }
    let verticesArrayIndex = 0
    vertices.map(function (v) {
      let pos = v.pos
      vertexData[verticesArrayIndex++] = pos._x
      vertexData[verticesArrayIndex++] = pos._y
      vertexData[verticesArrayIndex++] = pos._z
    })
    let planesArrayIndex = 0
    planes.map(function (p) {
      let normal = p.normal
      planeData[planesArrayIndex++] = normal._x
      planeData[planesArrayIndex++] = normal._y
      planeData[planesArrayIndex++] = normal._z
      planeData[planesArrayIndex++] = p.w
    })
    let result = {
      'class': 'CSG',
      numPolygons: numpolygons,
      numVerticesPerPolygon: numVerticesPerPolygon,
      polygonPlaneIndexes: polygonPlaneIndexes,
      polygonSharedIndexes: polygonSharedIndexes,
      polygonVertices: polygonVertices,
      vertexData: vertexData,
      planeData: planeData,
      shared: shareds
    }
    return result
  },

    // Get the transformation that transforms this CSG such that it is lying on the z=0 plane,
    // as flat as possible (i.e. the least z-height).
    // So that it is in an orientation suitable for CNC milling
  getTransformationAndInverseTransformationToFlatLying: function () {
    if (this.polygons.length === 0) {
      let m = new Matrix4x4() // unity
      return [m, m]
    } else {
            // get a list of unique planes in the CSG:
      let csg = this.canonicalized()
      let planemap = {}
      csg.polygons.map(function (polygon) {
        planemap[polygon.plane.getTag()] = polygon.plane
      })
            // try each plane in the CSG and find the plane that, when we align it flat onto z=0,
            // gives the least height in z-direction.
            // If two planes give the same height, pick the plane that originally had a normal closest
            // to [0,0,-1].
      let xvector = new Vector3D(1, 0, 0)
      let yvector = new Vector3D(0, 1, 0)
      let zvector = new Vector3D(0, 0, 1)
      let z0connectorx = new Connector([0, 0, 0], [0, 0, -1], xvector)
      let z0connectory = new Connector([0, 0, 0], [0, 0, -1], yvector)
      let isfirst = true
      let minheight = 0
      let maxdotz = 0
      let besttransformation, bestinversetransformation
      for (let planetag in planemap) {
        let plane = planemap[planetag]
        let pointonplane = plane.normal.times(plane.w)
        let transformation, inversetransformation
                // We need a normal vecrtor for the transformation
                // determine which is more perpendicular to the plane normal: x or y?
                // we will align this as much as possible to the x or y axis vector
        let xorthogonality = plane.normal.cross(xvector).length()
        let yorthogonality = plane.normal.cross(yvector).length()
        if (xorthogonality > yorthogonality) {
                    // x is better:
          let planeconnector = new Connector(pointonplane, plane.normal, xvector)
          transformation = planeconnector.getTransformationTo(z0connectorx, false, 0)
          inversetransformation = z0connectorx.getTransformationTo(planeconnector, false, 0)
        } else {
                    // y is better:
          let planeconnector = new Connector(pointonplane, plane.normal, yvector)
          transformation = planeconnector.getTransformationTo(z0connectory, false, 0)
          inversetransformation = z0connectory.getTransformationTo(planeconnector, false, 0)
        }
        let transformedcsg = csg.transform(transformation)
        let dotz = -plane.normal.dot(zvector)
        let bounds = transformedcsg.getBounds()
        let zheight = bounds[1].z - bounds[0].z
        let isbetter = isfirst
        if (!isbetter) {
          if (zheight < minheight) {
            isbetter = true
          } else if (zheight === minheight) {
            if (dotz > maxdotz) isbetter = true
          }
        }
        if (isbetter) {
                    // translate the transformation around the z-axis and onto the z plane:
          let translation = new Vector3D([-0.5 * (bounds[1].x + bounds[0].x), -0.5 * (bounds[1].y + bounds[0].y), -bounds[0].z])
          transformation = transformation.multiply(Matrix4x4.translation(translation))
          inversetransformation = Matrix4x4.translation(translation.negated()).multiply(inversetransformation)
          minheight = zheight
          maxdotz = dotz
          besttransformation = transformation
          bestinversetransformation = inversetransformation
        }
        isfirst = false
      }
      return [besttransformation, bestinversetransformation]
    }
  },

  getTransformationToFlatLying: function () {
    let result = this.getTransformationAndInverseTransformationToFlatLying()
    return result[0]
  },

  lieFlat: function () {
    let transformation = this.getTransformationToFlatLying()
    return this.transform(transformation)
  },

    // project the 3D CSG onto a plane
    // This returns a 2D CAG with the 'shadow' shape of the 3D solid when projected onto the
    // plane represented by the orthonormal basis
  projectToOrthoNormalBasis: function (orthobasis) {
    let cags = []
    this.polygons.filter(function (p) {
                // only return polys in plane, others may disturb result
      return p.plane.normal.minus(orthobasis.plane.normal).lengthSquared() < (EPS * EPS)
    })
            .map(function (polygon) {
              let cag = polygon.projectToOrthoNormalBasis(orthobasis)
              if (cag.sides.length > 0) {
                cags.push(cag)
              }
            })
    let result = new CAG().union(cags)
    return result
  },

  sectionCut: function (orthobasis) {
    let plane1 = orthobasis.plane
    let plane2 = orthobasis.plane.flipped()
    plane1 = new Plane(plane1.normal, plane1.w)
    plane2 = new Plane(plane2.normal, plane2.w + (5 * EPS))
    let cut3d = this.cutByPlane(plane1)
    cut3d = cut3d.cutByPlane(plane2)
    return cut3d.projectToOrthoNormalBasis(orthobasis)
  },

  fixTJunctions: function () {
    return fixTJunctions(CSG.fromPolygons, this)
  },

  toTriangles: function () {
    let polygons = []
    this.polygons.forEach(function (poly) {
      let firstVertex = poly.vertices[0]
      for (let i = poly.vertices.length - 3; i >= 0; i--) {
        polygons.push(new Polygon([
          firstVertex, poly.vertices[i + 1], poly.vertices[i + 2]
        ],
                    poly.shared, poly.plane))
      }
    })
    return polygons
  },

  /**
   * Returns an array of values for the requested features of this solid.
   * Supported Features: 'volume', 'area'
   * @param {String[]} features - list of features to calculate
   * @returns {Float[]} values
   * @example
   * let volume = A.getFeatures('volume')
   * let values = A.getFeatures('area','volume')
   */
  getFeatures: function (features) {
    if (!(features instanceof Array)) {
      features = [features]
    }
    let result = this.toTriangles().map(function (triPoly) {
      return triPoly.getTetraFeatures(features)
    })
            .reduce(function (pv, v) {
              return v.map(function (feat, i) {
                return feat + (pv === 0 ? 0 : pv[i])
              })
            }, 0)
    return (result.length === 1) ? result[0] : result
  }
}

/** Construct a CSG solid from a list of `Polygon` instances.
 * @param {Polygon[]} polygons - list of polygons
 * @returns {CSG} new CSG object
 */
CSG.fromPolygons = function fromPolygons (polygons) {
  let csg = new CSG()
  csg.polygons = polygons
  csg.isCanonicalized = false
  csg.isRetesselated = false
  return csg
}

const CSGFromCSGFuzzyFactory = function (factory, sourcecsg) {
  let _this = factory
  let newpolygons = []
  sourcecsg.polygons.forEach(function (polygon) {
    let newpolygon = _this.getPolygon(polygon)
          // see getPolygon above: we may get a polygon with no vertices, discard it:
    if (newpolygon.vertices.length >= 3) {
      newpolygons.push(newpolygon)
    }
  })
  return CSG.fromPolygons(newpolygons)
}

module.exports = CSG
