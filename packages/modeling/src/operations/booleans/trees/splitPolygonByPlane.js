import { EPS } from '../../../maths/constants.js'

import * as plane from '../../../maths/plane/index.js'
import * as vec3 from '../../../maths/vec3/index.js'

import * as poly3 from '../../../geometries/poly3/index.js'

import { splitLineSegmentByPlane } from './splitLineSegmentByPlane.js'

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
export const splitPolygonByPlane = (splane, polygon) => {
  const result = {
    type: null,
    front: null,
    back: null
  }
  // cache in local lets (speedup):
  const vertices = polygon.vertices
  const numVertices = vertices.length
  const pplane = poly3.plane(polygon)
  if (plane.equals(pplane, splane)) {
    result.type = 0
  } else {
    let hasFront = false
    let hasBack = false
    const vertexIsBack = []
    const MINEPS = -EPS
    for (let i = 0; i < numVertices; i++) {
      const t = vec3.dot(splane, vertices[i]) - splane[3]
      const isback = (t < MINEPS)
      vertexIsBack.push(isback)
      if (t > EPS) hasFront = true
      if (t < MINEPS) hasBack = true
    }
    if ((!hasFront) && (!hasBack)) {
      // all points coplanar
      const t = vec3.dot(splane, pplane)
      result.type = (t >= 0) ? 0 : 1
    } else if (!hasBack) {
      result.type = 2
    } else if (!hasFront) {
      result.type = 3
    } else {
      // spanning
      result.type = 4
      const frontVertices = []
      const backVertices = []
      let isback = vertexIsBack[0]
      for (let vertexIndex = 0; vertexIndex < numVertices; vertexIndex++) {
        const vertex = vertices[vertexIndex]
        let nextVertexIndex = vertexIndex + 1
        if (nextVertexIndex >= numVertices) nextVertexIndex = 0
        const nextIsBack = vertexIsBack[nextVertexIndex]
        if (isback === nextIsBack) {
          // line segment is on one side of the plane:
          if (isback) {
            backVertices.push(vertex)
          } else {
            frontVertices.push(vertex)
          }
        } else {
          // line segment intersects plane:
          const nextPoint = vertices[nextVertexIndex]
          const intersectionPoint = splitLineSegmentByPlane(splane, vertex, nextPoint)
          if (isback) {
            backVertices.push(vertex)
            backVertices.push(intersectionPoint)
            frontVertices.push(intersectionPoint)
          } else {
            frontVertices.push(vertex)
            frontVertices.push(intersectionPoint)
            backVertices.push(intersectionPoint)
          }
        }
        isback = nextIsBack
      } // for vertexIndex
      // remove duplicate vertices:
      const EPS_SQUARED = EPS * EPS
      if (backVertices.length >= 3) {
        let prevVertex = backVertices[backVertices.length - 1]
        for (let vertexIndex = 0; vertexIndex < backVertices.length; vertexIndex++) {
          const vertex = backVertices[vertexIndex]
          if (vec3.squaredDistance(vertex, prevVertex) < EPS_SQUARED) {
            backVertices.splice(vertexIndex, 1)
            vertexIndex--
          }
          prevVertex = vertex
        }
      }
      if (frontVertices.length >= 3) {
        let prevVertex = frontVertices[frontVertices.length - 1]
        for (let vertexIndex = 0; vertexIndex < frontVertices.length; vertexIndex++) {
          const vertex = frontVertices[vertexIndex]
          if (vec3.squaredDistance(vertex, prevVertex) < EPS_SQUARED) {
            frontVertices.splice(vertexIndex, 1)
            vertexIndex--
          }
          prevVertex = vertex
        }
      }
      if (frontVertices.length >= 3) {
        result.front = poly3.fromPointsAndPlane(frontVertices, pplane)
      }
      if (backVertices.length >= 3) {
        result.back = poly3.fromPointsAndPlane(backVertices, pplane)
      }
    }
  }
  return result
}
