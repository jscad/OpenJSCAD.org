/**
 * Calculates the distance between two vectors.
 *
 * @param {vec2} a - the first operand
 * @param {vec2} b - the second operand
 * @returns {Number} distance
 * @alias module:modeling/maths/vec2.distance
 */
const distance = (a, b) => {
  const x = b[0] - a[0]
  const y = b[1] - a[1]
  return Math.hypot(x, y)
}

module.exports = distance
