/**
 * Calculates the dot product of two vectors.
 *
 * @param {Vec2} a - first operand
 * @param {Vec2} b - second operand
 * @returns {number} dot product
 * @alias module:modeling/maths/vec2.dot
 */
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1]
