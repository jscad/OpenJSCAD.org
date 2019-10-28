const create = require('./create')

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} [out] - receiving vector
 * @param {vec2} vec - given vector to clone
 * @returns {vec2} clone of the vector
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
