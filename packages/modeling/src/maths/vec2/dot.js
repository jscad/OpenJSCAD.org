/**
 * Calculates the dot product of two vectors.
 *
 * @param {vec2} a - first operand
 * @param {vec2} b - second operand
 * @returns {Number} dot product
 * @alias module:modeling/maths/vec2.dot
 */
const dot = (a, b) => a[0] * b[0] + a[1] * b[1]

module.exports = dot
