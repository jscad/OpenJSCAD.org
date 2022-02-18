/**
 * Calculates the length of a vector.
 *
 * @param {vec3} vec - vector to calculate length of
 * @returns {Number} length
 * @alias module:modeling/maths/vec3.length
 */
const length = (vec) => {
  const x = vec[0]
  const y = vec[1]
  const z = vec[2]
  return Math.hypot(x, y, z)
}

module.exports = length
