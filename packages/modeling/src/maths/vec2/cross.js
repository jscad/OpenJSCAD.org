const vec3 = require('../vec3/index')

/**
 * Computes the cross product (3D) of two vectors.
 *
 * @param {vec3} [out] - the receiving vector (3D)
 * @param {vec2} a - the first operand
 * @param {vec2} b - the second operand
 * @returns {vec3} a new 3D vector
 * @alias module:modeling/maths/vec2.cross
 */
const cross = (...params) => {
  let out
  let a
  let b
  if (params.length === 2) {
    out = vec3.create()
    a = params[0]
    b = params[1]
  } else {
    out = params[0]
    a = params[1]
    b = params[2]
  }
  out[0] = 0
  out[1] = 0
  out[2] = a[0] * b[1] - a[1] * b[0]
  // alternative return vec3.cross(out, vec3.fromVec2(a), vec3.fromVec2(b))
  return out
}

module.exports = cross
