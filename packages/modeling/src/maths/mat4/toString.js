/**
 * Return a string representing the given matrix.
 *
 * @param {mat4} mat - matrix of reference
 * @returns {String} string representation
 * @alias module:modeling/maths/mat4.toString
 */
export const toString = (mat) => mat.map((n) => n.toFixed(7)).toString()

export default toString
