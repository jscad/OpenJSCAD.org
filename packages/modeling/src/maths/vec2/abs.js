const create = require('./create')

/**
 * Calculates the absolute coordinates of the given vector.
 *
 * @param {vec2} [out] - the receiving vector
 * @param {vec2} vec - the vector of reference
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.abs
 */
const abs = (...params) => {
  let out
  let vec
  if (params.length === 1) {
    out = create()
    vec = params[0]
  } else {
    out = params[0]
    vec = params[1]
  }
  out[0] = Math.abs(vec[0])
  out[1] = Math.abs(vec[1])
  return out
}

module.exports = abs
