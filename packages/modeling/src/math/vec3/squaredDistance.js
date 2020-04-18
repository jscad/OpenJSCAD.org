/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a - the first operand
 * @param {vec3} b - the second operand
 * @returns {Number} squared distance between a and b
 */
const squaredDistance = (a, b) => {
  const x = b[0] - a[0]
  const y = b[1] - a[1]
  const z = b[2] - a[2]
  return x * x + y * y + z * z
}

module.exports = squaredDistance
