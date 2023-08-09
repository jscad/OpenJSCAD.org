/**
 * Convert the given vector to a representative string.
 *
 * @param {Vec4} vec - vector to convert
 * @returns {string} representative string
 * @alias module:modeling/maths/vec4.toString
 */
export const toString = (vec) => `(${vec[0].toFixed(9)}, ${vec[1].toFixed(9)}, ${vec[2].toFixed(9)}, ${vec[3].toFixed(9)})`
