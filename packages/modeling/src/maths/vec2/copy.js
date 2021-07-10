/**
 * Create a copy of the given vector.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - source vector
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.copy
 */
const copy = (out, vector) => {
  out[0] = vector[0]
  out[1] = vector[1]
  return out
}

module.exports = copy
