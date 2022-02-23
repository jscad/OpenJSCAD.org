/**
 * Calculates the squared length of the given vector.
 *
 * @param {vec3} vector - vector to calculate squared length of
 * @returns {Number} squared length
 * @alias module:modeling/maths/vec3.squaredLength
 */
const squaredLength = (vector) => {
  const x = vector[0]
  const y = vector[1]
  const z = vector[2]
  return x * x + y * y + z * z
}

module.exports = squaredLength
