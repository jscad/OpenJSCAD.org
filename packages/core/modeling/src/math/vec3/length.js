/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a - vector to calculate length of
 * @returns {Number} length of a
 */
const length = (a) => {
  const x = a[0]
  const y = a[1]
  const z = a[2]
  return Math.sqrt(x * x + y * y + z * z)
}

module.exports = length
