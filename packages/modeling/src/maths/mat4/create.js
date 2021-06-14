/**
 * Represents a 4x4 matrix which is column-major (when typed out it looks row-major).
 * See fromValues().
 * @typedef {Array} mat4
 */

/**
 * Creates a new identity matrix.
 *
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.create
 */
const create = () => [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]

module.exports = create
