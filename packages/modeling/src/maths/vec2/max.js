/**
 * Returns the maximum coordinates of two vectors.
 *
 * @param {vec2} out - receiving vector
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.max
 */
const max = (out, a, b) => {
  out[0] = Math.max(a[0], b[0])
  out[1] = Math.max(a[1], b[1])
  return out
}

module.exports = max
