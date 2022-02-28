const plane = require('../../maths/plane')
const vec3 = require('../../maths/vec3')

/**
 * Check whether the given polygon is convex.
 * @param {poly3} polygon - the polygon to interrogate
 * @returns {Boolean} true if convex
 * @alias module:modeling/geometries/poly3.isConvex
 */
const isConvex = (polygon) => areVerticesConvex(polygon.vertices)

const areVerticesConvex = (vertices) => {
  const numvertices = vertices.length
  if (numvertices > 2) {
    // note: plane ~= normal point
    const normal = plane.fromPoints(plane.create(), ...vertices)
    let prevprevpos = vertices[numvertices - 2]
    let prevpos = vertices[numvertices - 1]
    for (let i = 0; i < numvertices; i++) {
      const pos = vertices[i]
      if (!isConvexPoint(prevprevpos, prevpos, pos, normal)) {
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
const isConvexPoint = (prevpoint, point, nextpoint, normal) => {
  const crossproduct = vec3.cross(
    vec3.create(),
    vec3.subtract(vec3.create(), point, prevpoint),
    vec3.subtract(vec3.create(), nextpoint, point)
  )
  const crossdotnormal = vec3.dot(crossproduct, normal)
  return crossdotnormal >= 0
}

module.exports = isConvex
