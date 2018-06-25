module.exports = cross
const create = require('./create')

/**
 * Computes the cross product of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
function cross (...params) {
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
  let z = a[0] * b[1] - a[1] * b[0]
  out[0] = out[1] = 0
  out[2] = z
  return out
}


