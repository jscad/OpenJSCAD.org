/**
 * Convert the given vector to a representative string.
 *
 * @param {vec4} vec - vector to convert
 * @returns {String} representative string
 * @alias module:modeling/maths/vec4.toString
 */
const toString = (vec) => `(${vec[0].toFixed(9)}, ${vec[1].toFixed(9)}, ${vec[2].toFixed(9)}, ${vec[3].toFixed(9)})`

module.exports = toString
