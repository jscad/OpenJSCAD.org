/**
 * Convert the given vector to a representative string.
 * @param {vec3} vec - vector of reference
 * @returns {String} string representation
 * @alias module:modeling/maths/vec3.toString
 */
const toString = (vec) => `[${vec[0].toFixed(7)}, ${vec[1].toFixed(7)}, ${vec[2].toFixed(7)}]`

module.exports = toString
