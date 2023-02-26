import * as plane from '../../maths/plane/index.js'
import * as vec3 from '../../maths/vec3/index.js'

/**
 * Check whether the given polygon is convex.
 * @param {poly3} polygon - the polygon to interrogate
 * @returns {Boolean} true if convex
 * @alias module:modeling/geometries/poly3.isConvex
 */
export const isConvex = (polygon) => areVerticesConvex(polygon.vertices)

const areVerticesConvex = (vertices) => {
  const numVertices = vertices.length
  if (numVertices > 2) {
    // note: plane ~= normal point
    const normal = plane.fromPoints(plane.create(), ...vertices)
    let prevPrevPos = vertices[numVertices - 2]
    let prevPos = vertices[numVertices - 1]
    for (let i = 0; i < numVertices; i++) {
      const pos = vertices[i]
      if (!isConvexPoint(prevPrevPos, prevPos, pos, normal)) {
        return false
      }
      prevPrevPos = prevPos
      prevPos = pos
    }
  }
  return true
}

// calculate whether three points form a convex corner
//  prevPoint, point, nextPoint: the 3 coordinates (Vector3D instances)
//  normal: the normal vector of the plane
const isConvexPoint = (prevPoint, point, nextPoint, normal) => {
  const crossProduct = vec3.cross(
    vec3.create(),
    vec3.subtract(vec3.create(), point, prevPoint),
    vec3.subtract(vec3.create(), nextPoint, point)
  )
  const crossDotNormal = vec3.dot(crossProduct, normal)
  return crossDotNormal >= 0
}
