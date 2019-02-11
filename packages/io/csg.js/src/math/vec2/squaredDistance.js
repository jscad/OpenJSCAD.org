/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
const squaredDistance = (a, b) => {
  const x = b[0] - a[0]
  const y = b[1] - a[1]
  return x * x + y * y
}

module.exports = squaredDistance
