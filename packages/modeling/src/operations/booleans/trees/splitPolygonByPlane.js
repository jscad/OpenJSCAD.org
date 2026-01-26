const { EPS } = require('../../../maths/constants')

const plane = require('../../../maths/plane')
const vec3 = require('../../../maths/vec3')

const poly3 = require('../../../geometries/poly3')

const splitLineSegmentByPlane = require('./splitLineSegmentByPlane')

const EPS_SQUARED = EPS * EPS

// Remove consecutive duplicate vertices from a polygon vertex list.
// Compares last vertex to first to handle wraparound.
// Returns a new array (does not modify input).
const removeConsecutiveDuplicates = (vertices) => {
  if (vertices.length < 3) return vertices
  const result = []
  let prevvertex = vertices[vertices.length - 1]
  for (let i = 0; i < vertices.length; i++) {
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
const splitPolygonByPlane = (splane, polygon) => {
  const result = {
    type: null,
    front: null,
    back: null
  }
  // cache in local lets (speedup):
  const vertices = polygon.vertices
  const numvertices = vertices.length
  const pplane = poly3.plane(polygon)
  if (plane.equals(pplane, splane)) {
    result.type = 0
  } else {
    let hasfront = false
    let hasback = false
    const vertexIsBack = []
    const MINEPS = -EPS
    for (let i = 0; i < numvertices; i++) {
      const t = vec3.dot(splane, vertices[i]) - splane[3]
      const isback = (t < MINEPS)
      vertexIsBack.push(isback)
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
      const frontvertices = []
      const backvertices = []
      let isback = vertexIsBack[0]
      for (let vertexindex = 0; vertexindex < numvertices; vertexindex++) {
        const vertex = vertices[vertexindex]
        let nextvertexindex = vertexindex + 1
        if (nextvertexindex >= numvertices) nextvertexindex = 0
        const nextisback = vertexIsBack[nextvertexindex]
        if (isback === nextisback) {
          // line segment is on one side of the plane:
          if (isback) {
            backvertices.push(vertex)
          } else {
            frontvertices.push(vertex)
          }
        } else {
          // line segment intersects plane:
          const nextpoint = vertices[nextvertexindex]
          const intersectionpoint = splitLineSegmentByPlane(splane, vertex, nextpoint)
          if (isback) {
            backvertices.push(vertex)
            backvertices.push(intersectionpoint)
            frontvertices.push(intersectionpoint)
          } else {
            frontvertices.push(vertex)
            frontvertices.push(intersectionpoint)
            backvertices.push(intersectionpoint)
          }
        }
        isback = nextisback
      } // for vertexindex
      // remove consecutive duplicate vertices
      const backFiltered = removeConsecutiveDuplicates(backvertices)
      const frontFiltered = removeConsecutiveDuplicates(frontvertices)
      if (frontFiltered.length >= 3) {
        result.front = poly3.fromPointsAndPlane(frontFiltered, pplane)
      }
      if (backFiltered.length >= 3) {
        result.back = poly3.fromPointsAndPlane(backFiltered, pplane)
      }
    }
  }
  return result
}

module.exports = splitPolygonByPlane
