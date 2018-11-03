const vec3 = require('../../math/vec3')

/** Check whether the polygon is convex. (it should be, otherwise we will get unexpected results)
 * @returns {boolean}
 */
const isConvex = (poly3) => {
  return areVerticesConvex(poly3.vertices, poly3.plane)
}

const areVerticesConvex = (vertices, plane) => {
  const numvertices = vertices.length
  if (numvertices > 2) {
    let prevprevpos = vertices[numvertices - 2]
    let prevpos = vertices[numvertices - 1]
    for (let i = 0; i < numvertices; i++) {
      const pos = vertices[i]
      if (!isConvexPoint(prevprevpos, prevpos, pos, plane)) {
        return false
      }
      prevprevpos = prevpos
      prevpos = pos
    }
  }
  return true
}

// calculate whether three points form a convex corner
//  prevpoint, point, nextpoint: the 3 coordinates (Vector3D instances)
//  normal: the normal vector of the plane
const isConvexPoint = (prevpoint, point, nextpoint, plane) => {
  const crossproduct = vec3.cross(
    vec3.subtract(point, prevpoint),
    vec3.subtract(nextpoint, point)
  )
  // note: plane ~= normal point
  const crossdotnormal = vec3.dot(crossproduct, plane)
  return crossdotnormal >= 0
}

// FIXME: not used anywhere ???
/* const isStrictlyConvexPoint = function (prevpoint, point, nextpoint, normal) {
  let crossproduct = point.minus(prevpoint).cross(nextpoint.minus(point))
  let crossdotnormal = crossproduct.dot(normal)
  return (crossdotnormal >= EPS)
} */

module.exports = isConvex
