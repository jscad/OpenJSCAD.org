/**
 * Returns whether or not the matrices have exactly the same elements in the same position.
 *
 * @param {mat4} a - first matrix
 * @param {mat4} b - second matrix
 * @returns {Boolean} true if the matrices are equal
 * @alias module:modeling/maths/mat4.equals
 */
const equals = (a, b) => (
  a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] &&
  a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] &&
  a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] &&
  a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15]
)

module.exports = equals
