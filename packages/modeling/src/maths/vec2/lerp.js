const create = require('./create')

/**
 * Performs a linear interpolation between two vectors.
 *
 * @param {vec2} [out] - the receiving vector
 * @param {Number} t - interpolation amount between the two vectors
 * @param {vec2} a - the first operand
 * @param {vec2} b - the second operand
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.lerp
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
  const ax = a[0]
  const ay = a[1]
  out[0] = ax + t * (b[0] - ax)
  out[1] = ay + t * (b[1] - ay)
  return out
}

module.exports = lerp
