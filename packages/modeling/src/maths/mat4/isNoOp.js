/**
 * Represents a 4x4 matrix which is column-major (when typed out it looks row-major).
 * See fromValues().
 * @typedef {Array} mat4
 */

/**
 * Check if it is matrix that is no-op (usually a new matrix)
 *
 * @param {mat4} a - the  matrix
 * @returns {Boolean} true if the matrix is no-op matrix
 * @alias module:modeling/maths/mat4.isNoOp
 */
const isNoOp = (a) => (
  a[0] === 1 && a[1] === 0 && a[2] === 0 && a[3] === 0 &&
  a[4] === 0 && a[5] === 1 && a[6] === 0 && a[7] === 0 &&
  a[8] === 0 && a[9] === 0 && a[10] === 1 && a[11] === 0 &&
  a[12] === 0 && a[13] === 0 && a[14] === 0 && a[15] === 1
)

module.exports = isNoOp
