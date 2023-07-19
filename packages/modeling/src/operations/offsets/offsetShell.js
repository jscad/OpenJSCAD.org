import { EPS, TAU } from '../../maths/constants.js'

import * as mat4 from '../../maths/mat4/index.js'
import * as vec3 from '../../maths/vec3/index.js'

import { fnNumberSort } from '../../utils/fnNumberSort.js'

import * as geom3 from '../../geometries/geom3/index.js'
import * as poly3 from '../../geometries/poly3/index.js'

import { sphere } from '../../primitives/sphere.js'

import { retessellate } from '../modifiers/retessellate.js'

import { unionGeom3Sub } from '../booleans/unionGeom3Sub.js'

import { extrudePolygon } from './extrudePolygon.js'

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
export const offsetShell = (options, geometry) => {
  const defaults = {
    delta: 1,
    segments: 12
  }
  const { delta, segments } = Object.assign({ }, defaults, options)

  const polygons = geom3.toPolygons(geometry)
  if (polygons.length === 0) return geometry

  let result = geom3.create()
  const vertices2planes = new Map() // {vertex: [vertex, [plane, ...]]}
  const edges2planes = new Map() // {edge: [[vertex, vertex], [plane, ...]]}

  const v1 = vec3.create()
  const v2 = vec3.create()

  // loop through the polygons
  // - extruded the polygon, and add to the composite result
  // - add the plane to the unique vertex map
  // - add the plane to the unique edge map
  polygons.forEach((polygon, index) => {
    const extrudeVector = vec3.scale(vec3.create(), poly3.plane(polygon), 2 * delta)
    const translatedPolygon = poly3.transform(mat4.fromTranslation(mat4.create(), vec3.scale(vec3.create(), extrudeVector, -0.5)), polygon)
    const extrudedFace = extrudePolygon(extrudeVector, translatedPolygon)
    result = unionGeom3Sub(result, extrudedFace)

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
    const startVertex = edge[0]
    const endVertex = edge[1]

    // our x,y and z vectors:
    const zBase = vec3.subtract(vec3.create(), endVertex, startVertex)
    vec3.normalize(zBase, zBase)
    const xBase = planes[0]
    const yBase = vec3.cross(vec3.create(), xBase, zBase)

    // make a list of angles that the cylinder should traverse:
    let angles = []

    // first of all equally spaced around the cylinder:
    for (let i = 0; i < segments; i++) {
      addUniqueAngle(angles, (i * TAU / segments))
    }

    // and also at every normal of all touching planes:
    for (let i = 0, iMax = planes.length; i < iMax; i++) {
      const planeNormal = planes[i]
      const si = vec3.dot(yBase, planeNormal)
      const co = vec3.dot(xBase, planeNormal)
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
    const numAngles = angles.length
    let prevP1
    let prevP2
    const startFaceVertices = []
    const endFaceVertices = []
    const polygons = []
    for (let i = -1; i < numAngles; i++) {
      const angle = angles[(i < 0) ? (i + numAngles) : i]
      const si = Math.sin(angle)
      const co = Math.cos(angle)
      vec3.scale(v1, xBase, co * delta)
      vec3.scale(v2, yBase, si * delta)
      vec3.add(v1, v1, v2)
      const p1 = vec3.add(vec3.create(), startVertex, v1)
      const p2 = vec3.add(vec3.create(), endVertex, v1)
      let skip = false
      if (i >= 0) {
        if (vec3.distance(p1, prevP1) < EPS) {
          skip = true
        }
      }
      if (!skip) {
        if (i >= 0) {
          startFaceVertices.push(p1)
          endFaceVertices.push(p2)
          const vertices = [prevP2, p2, p1, prevP1]
          const polygon = poly3.create(vertices)
          polygons.push(polygon)
        }
        prevP1 = p1
        prevP2 = p2
      }
    }
    endFaceVertices.reverse()
    polygons.push(poly3.create(startFaceVertices))
    polygons.push(poly3.create(endFaceVertices))

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
    let bestzaxisOrthogonality = 0
    for (let i = 1; i < planes.length; i++) {
      const normal = planes[i]
      const cross = vec3.cross(v1, xaxis, normal)
      const crossLength = vec3.length(cross)
      if (crossLength > 0.05) { // FIXME why 0.05?
        if (crossLength > bestzaxisOrthogonality) {
          bestzaxisOrthogonality = crossLength
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
