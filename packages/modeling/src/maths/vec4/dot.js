/**
 * Calculates the dot product of the given vectors.
 *
 * @param {vec4} a - first vector
 * @param {vec4} b - second vector
 * @returns {Number} dot product
 * @alias module:modeling/maths/vec4.dot
 */
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]

module.exports = dot
