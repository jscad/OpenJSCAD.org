const { EPS } = require('../../math/constants')

const { mat4, vec3 } = require('../../math')

const { fnNumberSort } = require('../../utils')

const { geom3, poly3 } = require('../../geometry')

const { sphere } = require('../../primitives')

const retessellate = require('../booleans/retessellate')
const unionGeom3Sub = require('../booleans/unionGeom3Sub')

const extrudePolygon = require('./extrudePolygon')

const mapPlaneToVertex = (map, vertex, plane) => {
  let i = map.findIndex((item) => vec3.equals(item[0], vertex))
  if (i < 0) {
    let entry = [vertex, [plane]]
    map.push(entry)
    return map.length
  }
  let planes = map[i][1]
  planes.push(plane)
  return i
}

const mapPlaneToEdge = (map, edge, plane) => {
  let i = map.findIndex((item) => {
    return (vec3.equals(item[0], edge[0]) && vec3.equals(item[1], edge[1])) ||
           (vec3.equals(item[0], edge[1]) && vec3.equals(item[1], edge[0]))
  })
  if (i < 0) {
    let entry = [edge, [plane]]
    map.push(entry)
    return map.length
  }
  let planes = map[i][1]
  planes.push(plane)
  return i
}

const addUniqueAngle = (map, angle) => {
  let i = map.findIndex((item) => item === angle)
  if (i < 0) {
    map.push(angle)
    return map.length
  }
  return i
}

/**
 * Create the expanded shell of the solid:
 * All faces are extruded to 2 times delta
 * Cylinders are constructed around every side
 * Spheres are placed on every vertex
 * the result is a true expansion of the solid
 * @param  {Number} delta
 * @param  {Integer} segments
 */
const expandShell = (options, geometry) => {
  const defaults = {
    delta: 1,
    segments: 12
  }
  let { delta, segments } = Object.assign({ }, defaults, options)

  let result = geom3.create()
  let vertices2planes = [] // contents: [vertex, [plane, ...]]
  let edges2planes = [] // contents: [[vertex, vertex], [plane, ...]]

  // loop through the polygons
  // - extruded the polygon, and add to the composite result
  // - add the plane to the unique vertice map
  // - add the plane to the unique edge map
  const polygons = geom3.toPolygons(geometry)
  polygons.forEach((polygon) => {
    let extrudevector = vec3.scale(2 * delta, polygon.plane)
    let translatedpolygon = poly3.transform(mat4.fromTranslation(vec3.scale(-0.5, extrudevector)), polygon)
    let extrudedface = extrudePolygon(extrudevector, translatedpolygon)
    result = unionGeom3Sub(result, extrudedface)

    let vertices = polygon.vertices
    for (let i = 0; i < vertices.length; i++) {
      mapPlaneToVertex(vertices2planes, vertices[i], polygon.plane)
      let j = (i + 1) % vertices.length
      let edge = [vertices[i], vertices[j]]
      mapPlaneToEdge(edges2planes, edge, polygon.plane)
    }
  })

  // now construct a cylinder on every side
  // The cylinder is always an approximation of a true cylinder, having polygons
  // around the sides. We will make sure though that the cylinder will have an edge at every
  // face that touches this side. This ensures that we will get a smooth fill even
  // if two edges are at, say, 10 degrees and the segments is low.
  edges2planes.forEach((item) => {
    let edge = item[0]
    let planes = item[1]
    let startpoint = edge[0]
    let endpoint = edge[1]

    // our x,y and z vectors:
    let zbase = vec3.unit(vec3.subtract(endpoint, startpoint))
    let xbase = planes[0]
    let ybase = vec3.cross(xbase, zbase)

    // make a list of angles that the cylinder should traverse:
    let angles = []

    // first of all equally spaced around the cylinder:
    for (let i = 0; i < segments; i++) {
      addUniqueAngle(angles, (i * Math.PI * 2 / segments))
    }

    // and also at every normal of all touching planes:
    for (let i = 0, iMax = planes.length; i < iMax; i++) {
      let planenormal = planes[i]
      let si = vec3.dot(ybase, planenormal)
      let co = vec3.dot(xbase, planenormal)
      let angle = Math.atan2(si, co)

      if (angle < 0) angle += Math.PI * 2
      addUniqueAngle(angles, angle)
      angle = Math.atan2(-si, -co)
      if (angle < 0) angle += Math.PI * 2
      addUniqueAngle(angles, angle)
    }

    // this will result in some duplicate angles but we will get rid of those later.
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
      let p = vec3.add(vec3.scale(co * delta, xbase), vec3.scale(si * delta, ybase))
      let p1 = vec3.add(startpoint, p)
      let p2 = vec3.add(endpoint, p)
      let skip = false
      if (i >= 0) {
        if (vec3.distance(p1, prevp1) < EPS) {
          skip = true
        }
      }
      if (!skip) {
        if (i >= 0) {
          startfacevertices.push(p1)
          endfacevertices.push(p2)
          let points = [prevp2, p2, p1, prevp1]
          let polygon = poly3.fromPoints(points)
          polygons.push(polygon)
        }
        prevp1 = p1
        prevp2 = p2
      }
    }
    endfacevertices.reverse()
    polygons.push(poly3.fromPoints(startfacevertices))
    polygons.push(poly3.fromPoints(endfacevertices))

    let cylinder = geom3.create(polygons)
    result = unionGeom3Sub(result, cylinder)
  })

  // build spheres at each unique vertex
  // We will try to set the x and z axis to the normals of 2 planes
  // This will ensure that our sphere tesselation somewhat matches 2 planes
  vertices2planes.forEach((item) => {
    let vertex = item[0]
    let planes = item[1]
    // use the first normal to be the x axis of our sphere:
    let xaxis = planes[0]
    // and find a suitable z axis. We will use the normal which is most perpendicular to the x axis:
    let bestzaxis = null
    let bestzaxisorthogonality = 0
    for (let i = 1; i < planes.length; i++) {
      let normal = planes[i]
      let cross = vec3.cross(xaxis, normal)
      let crosslength = vec3.length(cross)
      if (crosslength > 0.05) {
        if (crosslength > bestzaxisorthogonality) {
          bestzaxisorthogonality = crosslength
          bestzaxis = normal
        }
      }
    }
    if (!bestzaxis) {
      bestzaxis = vec3.random(xaxis)
    }
    let yaxis = vec3.unit(vec3.cross(xaxis, bestzaxis))
    let zaxis = vec3.cross(yaxis, xaxis)
    let corner = sphere({
      center: [vertex[0], vertex[1], vertex[2]],
      radius: delta,
      segments: segments,
      axes: [xaxis, yaxis, zaxis]
    })
    result = unionGeom3Sub(result, corner)
  })
  // FIXME ... hack hack hack
  result.isCanonicalized = true
  return retessellate(result)
}

module.exports = expandShell
