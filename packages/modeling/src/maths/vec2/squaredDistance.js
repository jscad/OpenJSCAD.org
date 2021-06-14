/**
 * Calculates the squared distance between the given vectors.
 *
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {Number} squared distance
 * @alias module:modeling/maths/vec2.squaredDistance
 */
const squaredDistance = (a, b) => {
  const x = b[0] - a[0]
  const y = b[1] - a[1]
  return x * x + y * y
}

module.exports = squaredDistance
