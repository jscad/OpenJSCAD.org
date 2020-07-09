const create = require('./create')

/**
 * Create a clone of the given vector.
 *
 * @param {vec4} [out] - receiving vector
 * @param {vec4} vector - vector to clone
 * @returns {vec4} a new vector
 * @alias module:modeling/maths/vec4.clone
 */
const clone = (...params) => {
  let out, vec
  if (params.length === 1) {
    out = create()
    vec = params[0]
  } else {
    out = params[0]
    vec = params[1]
  }
  out[0] = vec[0]
  out[1] = vec[1]
  out[2] = vec[2]
  out[3] = vec[3]
  return out
}

module.exports = clone
