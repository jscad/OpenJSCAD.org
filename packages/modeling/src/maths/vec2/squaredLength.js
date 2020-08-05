/**
 * Calculates the squared length of the given vector.
 *
 * @param {vec2} vector - vector of reference
 * @returns {Number} squared length
 * @alias module:modeling/maths/vec2.squaredLength
 */
const squaredLength = (a) => {
  const x = a[0]
  const y = a[1]
  return x * x + y * y
}

module.exports = squaredLength
