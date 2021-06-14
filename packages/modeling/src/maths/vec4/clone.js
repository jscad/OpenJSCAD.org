const create = require('./create')

/**
 * Create a clone of the given vector.
 *
 * @param {vec4} vector - source vector
 * @returns {vec4} a new vector
 * @alias module:modeling/maths/vec4.clone
 */
const clone = (vector) => {
  const out = create()
  out[0] = vector[0]
  out[1] = vector[1]
  out[2] = vector[2]
  out[3] = vector[3]
  return out
}

module.exports = clone
