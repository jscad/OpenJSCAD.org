/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
const squaredLength = (a) => {
  const x = a[0]
  const y = a[1]
  return x * x + y * y
}

module.exports = squaredLength
