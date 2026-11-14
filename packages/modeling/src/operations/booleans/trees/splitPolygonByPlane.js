const { EPS } = require('../../../maths/constants')

const plane = require('../../../maths/plane')
const vec3 = require('../../../maths/vec3')

const poly3 = require('../../../geometries/poly3')

const splitLineSegmentByPlane = require('./splitLineSegmentByPlane')

const EPS_SQUARED = EPS * EPS

// Object pool for reducing allocations in hot path.
// The result object is safe to reuse because callers extract front/back immediately.
// The temporary arrays are only used within splitPolygonByPlane.
const pool = {
  result: { type: null, front: null, back: null },
  vertexIsBack: new Array(64), // Pre-allocated, grows if needed
  frontvertices: new Array(32),
  backvertices: new Array(32)
}

// Remove consecutive duplicate vertices from a polygon vertex list.
// Compares last vertex to first to handle wraparound.
// Returns a new array (polygon vertices must be fresh arrays since they're stored in geometry).
// Accepts optional count parameter for use with pre-allocated pooled arrays.
const removeConsecutiveDuplicates = (vertices, count) => {
  const vertexCount = count !== undefined ? count : vertices.length
  if (vertexCount < 3) return vertices.slice(0, vertexCount)
  const result = []
  let prevvertex = vertices[vertexCount - 1]
  for (let i = 0; i < vertexCount; i++) {
    const vertex = vertices[i]
    if (vec3.squaredDistance(vertex, prevvertex) >= EPS_SQUARED) {
      result.push(vertex)
    }
    prevvertex = vertex
  }
  return result
}

// Returns object:
// .type:
//   0: coplanar-front
//   1: coplanar-back
//   2: front
//   3: back
//   4: spanning
// In case the polygon is spanning, returns:
// .front: a Polygon3 of the front part
// .back: a Polygon3 of the back part
//
// IMPORTANT: The returned object is reused between calls to reduce allocations.
// Callers must extract .front and .back before the next call to splitPolygonByPlane.
const splitPolygonByPlane = (splane, polygon) => {
  const result = pool.result
  result.type = null
  result.front = null
  result.back = null

  // cache in local lets (speedup):
  const vertices = polygon.vertices
  const numvertices = vertices.length
  const pplane = poly3.plane(polygon)
  if (plane.equals(pplane, splane)) {
    result.type = 0
  } else {
    let hasfront = false
    let hasback = false
    // Use pooled array, grow if needed
    let vertexIsBack = pool.vertexIsBack
    if (vertexIsBack.length < numvertices) {
      vertexIsBack = pool.vertexIsBack = new Array(numvertices * 2)
    }
    const MINEPS = -EPS
    for (let i = 0; i < numvertices; i++) {
      const t = vec3.dot(splane, vertices[i]) - splane[3]
      const isback = (t < MINEPS)
      vertexIsBack[i] = isback
      if (t > EPS) hasfront = true
      if (t < MINEPS) hasback = true
    }
    if ((!hasfront) && (!hasback)) {
      // all points coplanar
      const t = vec3.dot(splane, pplane)
      result.type = (t >= 0) ? 0 : 1
    } else if (!hasback) {
      result.type = 2
    } else if (!hasfront) {
      result.type = 3
    } else {
      // spanning
      result.type = 4
      // Use pooled arrays, grow if needed (max 2 vertices added per original vertex)
      const maxVerts = numvertices * 2
      let frontvertices = pool.frontvertices
      let backvertices = pool.backvertices
      if (frontvertices.length < maxVerts) {
        frontvertices = pool.frontvertices = new Array(maxVerts)
      }
      if (backvertices.length < maxVerts) {
        backvertices = pool.backvertices = new Array(maxVerts)
      }
      let frontCount = 0
      let backCount = 0

      let isback = vertexIsBack[0]
      for (let vertexindex = 0; vertexindex < numvertices; vertexindex++) {
        const vertex = vertices[vertexindex]
        let nextvertexindex = vertexindex + 1
        if (nextvertexindex >= numvertices) nextvertexindex = 0
        const nextisback = vertexIsBack[nextvertexindex]
        if (isback === nextisback) {
          // line segment is on one side of the plane:
          if (isback) {
            backvertices[backCount++] = vertex
          } else {
            frontvertices[frontCount++] = vertex
          }
        } else {
          // line segment intersects plane:
          const nextpoint = vertices[nextvertexindex]
          const intersectionpoint = splitLineSegmentByPlane(splane, vertex, nextpoint)
          if (isback) {
            backvertices[backCount++] = vertex
            backvertices[backCount++] = intersectionpoint
            frontvertices[frontCount++] = intersectionpoint
          } else {
            frontvertices[frontCount++] = vertex
            frontvertices[frontCount++] = intersectionpoint
            backvertices[backCount++] = intersectionpoint
          }
        }
        isback = nextisback
      } // for vertexindex
      // remove consecutive duplicate vertices and create final polygons
      // We need fresh arrays for the polygon vertices since they become part of the geometry
      if (frontCount >= 3) {
        const frontFiltered = removeConsecutiveDuplicates(frontvertices, frontCount)
        if (frontFiltered.length >= 3) {
          result.front = poly3.fromPointsAndPlane(frontFiltered, pplane)
        }
      }
      if (backCount >= 3) {
        const backFiltered = removeConsecutiveDuplicates(backvertices, backCount)
        if (backFiltered.length >= 3) {
          result.back = poly3.fromPointsAndPlane(backFiltered, pplane)
        }
      }
    }
  }
  return result
}

module.exports = splitPolygonByPlane
