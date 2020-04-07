/**
 * Calculates the dot product of two vectors.
 *
 * @param {vec2} a - the first operand
 * @param {vec2} b - the second operand
 * @returns {Number} dot product
 * @alias module:modeling/math/vec2.dot
 */
const dot = (a, b) => {
  return a[0] * b[0] + a[1] * b[1]
}

module.exports = dot
