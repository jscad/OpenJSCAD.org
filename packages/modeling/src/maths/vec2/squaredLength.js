/**
 * Calculates the squared length of the given vector.
 *
 * @param {vec2} vector - vector of reference
 * @returns {Number} squared length
 * @alias module:modeling/maths/vec2.squaredLength
 */
const squaredLength = (vector) => {
  const x = vector[0]
  const y = vector[1]
  return x * x + y * y
}

module.exports = squaredLength
