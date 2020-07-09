const create = require('./create')

/**
 * Create a clone of the given vector.
 *
 * @param {vec2} [out] - receiving vector
 * @param {vec2} vec - vector to clone
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.clone
 */
const clone = (...params) => {
  let out
  let vec
  if (params.length === 1) {
    out = create()
    vec = params[0]
  } else {
    out = params[0]
    vec = params[1]
  }
  out[0] = vec[0]
  out[1] = vec[1]
  return out
}

module.exports = clone
