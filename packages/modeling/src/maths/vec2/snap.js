/**
 * Snaps the coordinates of the given vector to the given epsilon.
 *
 * @param {vec2} out - the receiving vector
 * @param {Number} epsilon - epsilon of precision, less than 0
 * @param {vec2} vector - the vector to snap
 * @returns {vec2} the resulting vector
 * @alias module:modeling/maths/vec2.snap
 */
const snap = (output, epsilon, input) => {
  output[0] = Math.round(input[0] / epsilon) * epsilon + 0
  output[1] = Math.round(input[1] / epsilon) * epsilon + 0
  return output
}

module.exports = snap
