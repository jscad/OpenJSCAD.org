const create = require('./create')

/**
 * Create a clone of the given vector.
 *
 * @param {vec3} [out] - receiving vector
 * @param {vec3} vec - vector to clone
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/vec3.clone
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
  out[2] = vec[2]
  return out
}

module.exports = clone
