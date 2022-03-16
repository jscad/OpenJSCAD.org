const vec3 = require('../vec3')

/**
 * Create a plane from the given points.
 *
 * @param {plane} out - receiving plane
 * @param {Array} vertices - points on the plane
 * @returns {plane} out
 * @alias module:modeling/maths/plane.fromPoints
 */
const fromPoints = (out, ...vertices) => {
  const len = vertices.length

  // Calculate normal vector for a single vertex
  // Inline to avoid allocations
  const ba = vec3.create()
  const ca = vec3.create()
  const vertexNormal = (index) => {
    const a = vertices[index]
    const b = vertices[(index + 1) % len]
    const c = vertices[(index + 2) % len]
    vec3.subtract(ba, b, a) // ba = b - a
    vec3.subtract(ca, c, a) // ca = c - a
    vec3.cross(ba, ba, ca) // ba = ba x ca
    vec3.normalize(ba, ba)
    return ba
  }

  out[0] = 0
  out[1] = 0
  out[2] = 0
  if (len === 3) {
    // optimization for triangles, which are always coplanar
    vec3.copy(out, vertexNormal(0))
  } else {
    // sum of vertex normals
    vertices.forEach((v, i) => {
      vec3.add(out, out, vertexNormal(i))
    })
    // renormalize normal vector
    vec3.normalize(out, out)
  }
  out[3] = vec3.dot(out, vertices[0])
  return out
}

module.exports = fromPoints
