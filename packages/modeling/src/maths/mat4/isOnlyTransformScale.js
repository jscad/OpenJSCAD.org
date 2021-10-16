
/**
 * Determine whether the given matrix is translate+scale.
 * this code returns true for 180 rotation as it can be interpreted as scale (-1,-1)
 *
 * this method is primarily useful for measureBoundingBox
 *
 */
const isOnlyTransformScale = (matrix) => (

  // TODO check if it is worth the effort to add recognition of 90 deg rotations

  isZero(matrix[1]) && isZero(matrix[2]) && isZero(matrix[3]) &&
  isZero(matrix[4]) && isZero(matrix[6]) && isZero(matrix[7]) &&
  isZero(matrix[8]) && isZero(matrix[9]) && isZero(matrix[11]) &&
  matrix[15] === 1
)

const isZero = (num) => Math.abs(num) < Number.EPSILON

module.exports = isOnlyTransformScale
