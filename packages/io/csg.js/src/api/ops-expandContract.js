
const {EPS, angleEPS} = require('../core/constants')
const Vertex = require('../core/math/Vertex3')
const Vector2D = require('../core/math/Vector2')
const Polygon = require('../core/math/Polygon3')
const {fnNumberSort, isCSG} = require('../core/utils')
const {fromPoints, fromPointsNoCheck} = require('../core/CAGFactories')

const expand = function (shape, radius, resolution) {
  let result
  if (isCSG(shape)) {
    result = shape.union(expandedShellOfCCSG(shape, radius, resolution))
    result = result.reTesselated()
    result.properties = shape.properties // keep original properties
  } else {
    result = shape.union(expandedShellOfCAG(shape, radius, resolution))
  }
  return result
}

const contract = function (shape, radius, resolution) {
  let result
  if (isCSG(shape)) {
    result = shape.subtract(expandedShellOfCCSG(shape, radius, resolution))
    result = result.reTesselated()
    result.properties = shape.properties // keep original properties
  } else {
    result = shape.subtract(expandedShellOfCAG(shape, radius, resolution))
  }
  return result
}

const expandedShellOfCAG = function (_cag, radius, resolution) {
  const CAG = require('../core/CAG') // FIXME, circular dependency !!
  resolution = resolution || 8
  if (resolution < 4) resolution = 4
  let cags = []
  let pointmap = {}
  let cag = _cag.canonicalized()
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
      //      let newcag = fromPointsNoCheck(shellpoints);
      let newcag = fromPoints(shellpoints)
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
      let newcag = fromPointsNoCheck(points)
      cags.push(newcag)
    }
  }
  let result = new CAG()
  result = result.union(cags)
  return result
}

/**
 * Create the expanded shell of the solid:
 * All faces are extruded to get a thickness of 2*radius
 * Cylinders are constructed around every side
 * Spheres are placed on every vertex
 * unionWithThis: if true, the resulting solid will be united with 'this' solid;
 * the result is a true expansion of the solid
 * If false, returns only the shell
 * @param  {Float} radius
 * @param  {Integer} resolution
 * @param  {Boolean} unionWithThis
 */
const expandedShellOfCCSG = function (_csg, radius, resolution, unionWithThis) {
  const CSG = require('../core/CSG') // FIXME: circular dependency ! CSG => this => CSG
  const {fromPolygons} = require('../core/CSGFactories') // FIXME: circular dependency !
  // const {sphere} = require('./primitives3d') // FIXME: circular dependency !
  let csg = _csg.reTesselated()
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
    let cylinder = fromPolygons(polygons)
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
}

module.exports = {
  expand,
  contract,
  expandedShellOfCAG,
  expandedShellOfCCSG
}
