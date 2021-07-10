const vec3 = require('../vec3')

/**
 * Create a plane from the given points.
 *
 * @param {plane} out - receiving plane
 * @param {vec3} a - 3D point
 * @param {vec3} b - 3D point
 * @param {vec3} c - 3D point
 * @returns {plane} out
 * @alias module:modeling/maths/plane.fromPoints
 */
const fromPoints = (out, a, b, c) => {
  const ba = vec3.subtract(vec3.create(), b, a)
  const ca = vec3.subtract(vec3.create(), c, a)
  vec3.cross(ba, ba, ca)
  vec3.normalize(ba, ba) // normal part
  const w = vec3.dot(ba, a)

  out[0] = ba[0]
  out[1] = ba[1]
  out[2] = ba[2]
  out[3] = w
  return out
}

module.exports = fromPoints
