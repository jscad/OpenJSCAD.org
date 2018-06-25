const vec3 = require('../../math/vec3')

/** Check whether the polygon is convex. (it should be, otherwise we will get unexpected results)
 * @returns {boolean}
 */
const isConvex = (poly3) => {
  return areVerticesConvex(poly3.vertices, poly3.plane.normal)
}

const areVerticesConvex = function (vertices, planenormal) {
  let numvertices = vertices.length
  if (numvertices > 2) {
    let prevprevpos = vertices[numvertices - 2].pos
    let prevpos = vertices[numvertices - 1].pos
    for (let i = 0; i < numvertices; i++) {
      let pos = vertices[i].pos
      if (!isConvexPoint(prevprevpos, prevpos, pos, planenormal)) {
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
const isConvexPoint = function (prevpoint, point, nextpoint, normal) {
  const crossproduct = vec3.cross(
    vec3.subtract(point, prevpoint),
    vec3.subtract(nextpoint, point)
  )
  const crossdotnormal = vec3.dot(crossproduct, normal)
  return crossdotnormal >= 0
}

// FIXME: not used anywhere ???
/* const isStrictlyConvexPoint = function (prevpoint, point, nextpoint, normal) {
  let crossproduct = point.minus(prevpoint).cross(nextpoint.minus(point))
  let crossdotnormal = crossproduct.dot(normal)
  return (crossdotnormal >= EPS)
} */

module.exports = isConvex
