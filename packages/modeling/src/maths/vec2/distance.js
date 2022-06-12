/**
 * Calculates the distance between two vectors.
 *
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {Number} distance
 * @alias module:modeling/maths/vec2.distance
 */
const distance = (a, b) => {
  const x = b[0] - a[0]
  const y = b[1] - a[1]
  return Math.sqrt(x * x + y * y)
}

module.exports = distance
