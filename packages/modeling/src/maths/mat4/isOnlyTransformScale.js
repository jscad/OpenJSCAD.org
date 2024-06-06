
/**
 * Determine whether the given matrix is only translate and/or scale.
 * This code returns true for TAU / 2 rotation as it can be interpreted as scale.
 *
 * @param {Mat4} matrix - the matrix
 * @returns {boolean} true if matrix is for translate and/or scale
 * @alias module:modeling/maths/mat4.isOnlyTransformScale
 */
export const isOnlyTransformScale = (matrix) => (

  // TODO check if it is worth the effort to add recognition of 90 deg rotations

  isZero(matrix[1]) && isZero(matrix[2]) && isZero(matrix[3]) &&
  isZero(matrix[4]) && isZero(matrix[6]) && isZero(matrix[7]) &&
  isZero(matrix[8]) && isZero(matrix[9]) && isZero(matrix[11]) &&
  matrix[15] === 1
)

/**
 * @param {number} num
 * @returns {boolean}
 */
const isZero = (num) => Math.abs(num) < Number.EPSILON
