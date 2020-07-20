const create = require('./create')

/**
 * Calculates the absolute coordinates of the give vector.
 *
 * @param {vec3} [out] - the receiving vector
 * @param {vec3} vec - the vector of reference
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/vec3.abs
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
  out[2] = Math.abs(vec[2])
  return out
}

module.exports = abs
