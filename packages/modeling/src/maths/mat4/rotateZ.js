const { sin, cos } = require('../utils/trigonometry')

/**
 * Rotates a matrix by the given angle around the Z axis.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to rotate
 * @param {Number} radians - angle to rotate the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.rotateZ
 */
const rotateZ = (out, matrix, radians) => {
  const s = sin(radians)
  const c = cos(radians)
  const a00 = matrix[0]
  const a01 = matrix[1]
  const a02 = matrix[2]
  const a03 = matrix[3]
  const a10 = matrix[4]
  const a11 = matrix[5]
  const a12 = matrix[6]
  const a13 = matrix[7]

  if (matrix !== out) { // If the source and destination differ, copy the unchanged last row
    out[8] = matrix[8]
    out[9] = matrix[9]
    out[10] = matrix[10]
    out[11] = matrix[11]
    out[12] = matrix[12]
    out[13] = matrix[13]
    out[14] = matrix[14]
    out[15] = matrix[15]
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c + a10 * s
  out[1] = a01 * c + a11 * s
  out[2] = a02 * c + a12 * s
  out[3] = a03 * c + a13 * s
  out[4] = a10 * c - a00 * s
  out[5] = a11 * c - a01 * s
  out[6] = a12 * c - a02 * s
  out[7] = a13 * c - a03 * s
  return out
}

module.exports = rotateZ
