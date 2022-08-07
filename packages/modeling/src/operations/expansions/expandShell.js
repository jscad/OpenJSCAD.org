const { EPS, TAU } = require('../../maths/constants')

const mat4 = require('../../maths/mat4')
const vec3 = require('../../maths/vec3')

const fnNumberSort = require('../../utils/fnNumberSort')

const geom3 = require('../../geometries/geom3')
const poly3 = require('../../geometries/poly3')

const sphere = require('../../primitives/sphere')

const retessellate = require('../modifiers/retessellate')

const unionGeom3Sub = require('../booleans/unionGeom3Sub')

const extrudePolygon = require('./extrudePolygon')

/*
 * Collect all planes adjacent to each vertex
 */
const mapPlaneToVertex = (map, vertex, plane) => {
  const key = vertex.toString()
  if (!map.has(key)) {
    const entry = [vertex, [plane]]
    map.set(key, entry)
  } else {
    const planes = map.get(key)[1]
    planes.push(plane)
  }
}

/*
 * Collect all planes adjacent to each edge.
 * Combine undirected edges, no need for duplicate cylinders.
 */
const mapPlaneToEdge = (map, edge, plane) => {
  const key0 = edge[0].toString()
  const key1 = edge[1].toString()
  // Sort keys to make edges undirected
  const key = key0 < key1 ? `${key0},${key1}` : `${key1},${key0}`
  if (!map.has(key)) {
    const entry = [edge, [plane]]
    map.set(key, entry)
  } else {
    const planes = map.get(key)[1]
    planes.push(plane)
  }
}

const addUniqueAngle = (map, angle) => {
  const i = map.findIndex((item) => item === angle)
  if (i < 0) {
    map.push(angle)
  }
}

/*
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
  const { delta, segments } = Object.assign({ }, defaults, options)

  let result = geom3.create()
  const vertices2planes = new Map() // {vertex: [vertex, [plane, ...]]}
  const edges2planes = new Map() // {edge: [[vertex, vertex], [plane, ...]]}

  const v1 = vec3.create()
  const v2 = vec3.create()

  // loop through the polygons
  // - extruded the polygon, and add to the composite result
  // - add the plane to the unique vertice map
  // - add the plane to the unique edge map
  const polygons = geom3.toPolygons(geometry)
  polygons.forEach((polygon, index) => {
    const extrudevector = vec3.scale(vec3.create(), poly3.plane(polygon), 2 * delta)
    const translatedpolygon = poly3.transform(mat4.fromTranslation(mat4.create(), vec3.scale(vec3.create(), extrudevector, -0.5)), polygon)
    const extrudedface = extrudePolygon(extrudevector, translatedpolygon)
    result = unionGeom3Sub(result, extrudedface)

    const vertices = polygon.vertices
    for (let i = 0; i < vertices.length; i++) {
      mapPlaneToVertex(vertices2planes, vertices[i], poly3.plane(polygon))
      const j = (i + 1) % vertices.length
      const edge = [vertices[i], vertices[j]]
      mapPlaneToEdge(edges2planes, edge, poly3.plane(polygon))
    }
  })

  // now construct a cylinder on every side
  // The cylinder is always an approximation of a true cylinder, having polygons
  // around the sides. We will make sure though that the cylinder will have an edge at every
  // face that touches this side. This ensures that we will get a smooth fill even
  // if two edges are at, say, 10 degrees and the segments is low.
  edges2planes.forEach((item) => {
    const edge = item[0]
    const planes = item[1]
    const startpoint = edge[0]
    const endpoint = edge[1]

    // our x,y and z vectors:
    const zbase = vec3.subtract(vec3.create(), endpoint, startpoint)
    vec3.normalize(zbase, zbase)
    const xbase = planes[0]
    const ybase = vec3.cross(vec3.create(), xbase, zbase)

    // make a list of angles that the cylinder should traverse:
    let angles = []

    // first of all equally spaced around the cylinder:
    for (let i = 0; i < segments; i++) {
      addUniqueAngle(angles, (i * TAU / segments))
    }

    // and also at every normal of all touching planes:
    for (let i = 0, iMax = planes.length; i < iMax; i++) {
      const planenormal = planes[i]
      const si = vec3.dot(ybase, planenormal)
      const co = vec3.dot(xbase, planenormal)
      let angle = Math.atan2(si, co)

      if (angle < 0) angle += TAU
      addUniqueAngle(angles, angle)
      angle = Math.atan2(-si, -co)
      if (angle < 0) angle += TAU
      addUniqueAngle(angles, angle)
    }

    // this will result in some duplicate angles but we will get rid of those later.
    angles = angles.sort(fnNumberSort)

    // Now construct the cylinder by traversing all angles:
    const numangles = angles.length
    let prevp1
    let prevp2
    const startfacevertices = []
    const endfacevertices = []
    const polygons = []
    for (let i = -1; i < numangles; i++) {
      const angle = angles[(i < 0) ? (i + numangles) : i]
      const si = Math.sin(angle)
      const co = Math.cos(angle)
      vec3.scale(v1, xbase, co * delta)
      vec3.scale(v2, ybase, si * delta)
      vec3.add(v1, v1, v2)
      const p1 = vec3.add(vec3.create(), startpoint, v1)
      const p2 = vec3.add(vec3.create(), endpoint, v1)
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
          const points = [prevp2, p2, p1, prevp1]
          const polygon = poly3.create(points)
          polygons.push(polygon)
        }
        prevp1 = p1
        prevp2 = p2
      }
    }
    endfacevertices.reverse()
    polygons.push(poly3.create(startfacevertices))
    polygons.push(poly3.create(endfacevertices))

    const cylinder = geom3.create(polygons)
    result = unionGeom3Sub(result, cylinder)
  })

  // build spheres at each unique vertex
  // We will try to set the x and z axis to the normals of 2 planes
  // This will ensure that our sphere tesselation somewhat matches 2 planes
  vertices2planes.forEach((item) => {
    const vertex = item[0]
    const planes = item[1]
    // use the first normal to be the x axis of our sphere:
    const xaxis = planes[0]
    // and find a suitable z axis. We will use the normal which is most perpendicular to the x axis:
    let bestzaxis = null
    let bestzaxisorthogonality = 0
    for (let i = 1; i < planes.length; i++) {
      const normal = planes[i]
      const cross = vec3.cross(v1, xaxis, normal)
      const crosslength = vec3.length(cross)
      if (crosslength > 0.05) { // FIXME why 0.05?
        if (crosslength > bestzaxisorthogonality) {
          bestzaxisorthogonality = crosslength
          bestzaxis = normal
        }
      }
    }
    if (!bestzaxis) {
      bestzaxis = vec3.orthogonal(v1, xaxis)
    }
    const yaxis = vec3.cross(v1, xaxis, bestzaxis)
    vec3.normalize(yaxis, yaxis)
    const zaxis = vec3.cross(v2, yaxis, xaxis)
    const corner = sphere({
      center: [vertex[0], vertex[1], vertex[2]],
      radius: delta,
      segments: segments,
      axes: [xaxis, yaxis, zaxis]
    })
    result = unionGeom3Sub(result, corner)
  })
  return retessellate(result)
}

module.exports = expandShell
