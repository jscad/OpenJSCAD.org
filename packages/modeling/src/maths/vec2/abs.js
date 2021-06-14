/**
 * Calculates the absolute coordinates of the given vector.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} vector - vector of reference
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.abs
 */
const abs = (out, vector) => {
  out[0] = Math.abs(vector[0])
  out[1] = Math.abs(vector[1])
  return out
}

module.exports = abs
