/**
 * Calculates the squared length of the given vector.
 *
 * @param {vec2} vec - vector of reference
 * @returns {Number} squared length
 * @alias module:modeling/maths/vec2.squaredLength
 */
const squaredLength = (vec) => {
  const x = vec[0]
  const y = vec[1]
  return x * x + y * y
}

module.exports = squaredLength
