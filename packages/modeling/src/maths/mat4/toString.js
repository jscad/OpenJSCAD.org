/**
 * Return a string representing the given matrix.
 *
 * @param {mat4} matrix - matrix of reference
 * @returns {String} string representation
 * @alias module:modeling/maths/mat4.toString
 */
const toString = (mat) => `[${mat[0].toFixed(7)}, ${mat[1].toFixed(7)}, ${mat[2].toFixed(7)}, ${mat[3].toFixed(7)}, ${mat[4].toFixed(7)}, ${mat[5].toFixed(7)}, ${mat[6].toFixed(7)}, ${mat[7].toFixed(7)}, ${mat[8].toFixed(7)}, ${mat[9].toFixed(7)}, ${mat[10].toFixed(7)}, ${mat[11].toFixed(7)}, ${mat[12].toFixed(7)}, ${mat[13].toFixed(7)}, ${mat[14].toFixed(7)}, ${mat[15].toFixed(7)}]`

module.exports = toString
