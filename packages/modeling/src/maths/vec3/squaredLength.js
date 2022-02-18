/**
 * Calculates the squared length of the given vector.
 *
 * @param {vec3} vec - vector to calculate squared length of
 * @returns {Number} squared length
 * @alias module:modeling/maths/vec3.squaredLength
 */
const squaredLength = (vec) => {
  const x = vec[0]
  const y = vec[1]
  const z = vec[2]
  return x * x + y * y + z * z
}

module.exports = squaredLength
