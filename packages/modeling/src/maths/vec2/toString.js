/**
 * Convert the given vector to a representative string.
 *
 * @param {vec2} vector - vector of reference
 * @returns {String} string representation
 * @alias module:modeling/maths/vec2.toString
 */
export const toString = (vector) => `[${vector[0].toFixed(7)}, ${vector[1].toFixed(7)}]`

export default toString
