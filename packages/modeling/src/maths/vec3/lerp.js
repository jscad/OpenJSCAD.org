const create = require('./create')

/**
 * Performs a linear interpolation between two vectors.
 *
 * @param {vec3} [out] - the receiving vector
 * @param {Number} t - interpolant (0.0 to 1.0) applied between the two inputs
 * @param {vec3} a - the first operand
 * @param {vec3} b - the second operand
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/vec3.lerp
 */
const lerp = (...params) => {
  let out
  let t
  let a
  let b
  if (params.length === 3) {
    out = create()
    t = params[0]
    a = params[1]
    b = params[2]
  } else {
    out = params[0]
    t = params[1]
    a = params[2]
    b = params[3]
  }
  out[0] = a[0] + t * (b[0] - a[0])
  out[1] = a[1] + t * (b[1] - a[1])
  out[2] = a[2] + t * (b[2] - a[2])
  return out
}

module.exports = lerp
