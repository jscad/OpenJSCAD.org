/**
 * Convert the given vector to a representative string.
 *
 * @param {Vec2} vector - vector of reference
 * @returns {string} string representation
 * @alias module:modeling/maths/vec2.toString
 */
export const toString = (vector) => `[${vector[0].toFixed(7)}, ${vector[1].toFixed(7)}]`
