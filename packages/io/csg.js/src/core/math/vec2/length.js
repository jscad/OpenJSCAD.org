module.exports = length

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
function length (a) {
  const x = a[0]
  const y = a[1]
  return Math.sqrt(x * x + y * y)
}
