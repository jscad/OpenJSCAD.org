/**
 * Calculates the length of the given vector.
 *
 * @param {vec2} vector - vector of reference
 * @returns {Number} length
 * @alias module:modeling/maths/vec2.length
 */
const length = (a) => {
  const x = a[0]
  const y = a[1]
  return Math.sqrt(x * x + y * y)
}

module.exports = length
