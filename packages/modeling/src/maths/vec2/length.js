/**
 * Calculates the length of the given vector.
 *
 * @param {vec2} vec - vector of reference
 * @returns {Number} length
 * @alias module:modeling/maths/vec2.length
 */
const length = (vec) => Math.hypot(vec[0], vec[1])

module.exports = length
