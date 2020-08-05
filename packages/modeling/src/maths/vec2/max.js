const create = require('./create')

/**
 * Returns the maximum coordinates of two vectors.
 *
 * @param {vec2} [out] - the receiving vector
 * @param {vec2} a - the first operand
 * @param {vec2} b - the second operand
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.max
 */
const max = (...params) => {
  let out
  let a
  let b
  if (params.length === 2) {
    out = create()
    a = params[0]
    b = params[1]
  } else {
    out = params[0]
    a = params[1]
    b = params[2]
  }
  out[0] = Math.max(a[0], b[0])
  out[1] = Math.max(a[1], b[1])
  return out
}

module.exports = max
