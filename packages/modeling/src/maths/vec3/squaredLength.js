/**
 * Calculates the squared length of the given vector.
 *
 * @param {vec3} vector - vector to calculate squared length of
 * @returns {Number} squared length
 * @alias module:modeling/maths/vec3.squaredLength
 */
const squaredLength = (a) => {
  const x = a[0]
  const y = a[1]
  const z = a[2]
  return x * x + y * y + z * z
}

module.exports = squaredLength
