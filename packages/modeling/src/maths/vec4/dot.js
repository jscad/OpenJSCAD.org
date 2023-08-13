/**
 * Calculates the dot product of the given vectors.
 *
 * @param {Vec4} a - first vector
 * @param {Vec4} b - second vector
 * @returns {number} dot product
 * @alias module:modeling/maths/vec4.dot
 */
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3]
