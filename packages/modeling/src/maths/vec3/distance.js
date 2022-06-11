/**
 * Calculates the Euclidian distance between the given vectors.
 *
 * @param {vec3} a - first operand
 * @param {vec3} b - second operand
 * @returns {Number} distance
 * @alias module:modeling/maths/vec3.distance
 */
const distance = (a, b) => {
  const x = b[0] - a[0]
  const y = b[1] - a[1]
  const z = b[2] - a[2]
  return Math.sqrt(x * x + y * y + z * z)
}

module.exports = distance
