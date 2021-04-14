const vec3 = require('../vec3')
const fromValues = require('../vec4/fromValues')

/**
 * Create a plane from the given points.
 *
 * @param {vec3} a - 3D point
 * @param {vec3} b - 3D point
 * @param {vec3} c - 3D point
 * @returns {plane} a new plane
 * @alias module:modeling/maths/plane.fromPoints
 */
const fromPoints = (a, b, c) => {
  const ba = vec3.subtract(b, a)
  const ca = vec3.subtract(c, a)
  vec3.cross(ba, ba, ca)
  vec3.unit(ba, ba) // normal part
  const w = vec3.dot(ba, a)
  return fromValues(ba[0], ba[1], ba[2], w)
}

module.exports = fromPoints
