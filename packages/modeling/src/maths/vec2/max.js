/**
 * Returns the maximum coordinates of two vectors.
 *
 * @param {vec2} out - the receiving vector
 * @param {vec2} a - the first operand
 * @param {vec2} b - the second operand
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.max
 */
const max = (out, a, b) => {
  out[0] = Math.max(a[0], b[0])
  out[1] = Math.max(a[1], b[1])
  return out
}

module.exports = max
