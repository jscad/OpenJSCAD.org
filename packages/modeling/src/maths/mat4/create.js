/**
 * Represents a 4x4 matrix which is column-major (when typed out it looks row-major).
 * See fromValues().
 */

/**
 * Creates a new identity matrix.
 *
 * @returns {Mat4} a new matrix
 * @alias module:modeling/maths/mat4.create
 */
export const create = () => [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]
