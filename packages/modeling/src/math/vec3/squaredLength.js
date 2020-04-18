/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a - vector to calculate squared length of
 * @returns {Number} squared length of a
 */
const squaredLength = (a) => {
  const x = a[0]
  const y = a[1]
  const z = a[2]
  return x * x + y * y + z * z
}

module.exports = squaredLength
