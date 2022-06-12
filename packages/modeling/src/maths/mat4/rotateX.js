const { sin, cos } = require('../utils/trigonometry')

/**
 * Rotates a matrix by the given angle around the X axis.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to rotate
 * @param {Number} radians - angle to rotate the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.rotateX
 */
const rotateX = (out, matrix, radians) => {
  const s = sin(radians)
  const c = cos(radians)
  const a10 = matrix[4]
  const a11 = matrix[5]
  const a12 = matrix[6]
  const a13 = matrix[7]
  const a20 = matrix[8]
  const a21 = matrix[9]
  const a22 = matrix[10]
  const a23 = matrix[11]

  if (matrix !== out) { // If the source and destination differ, copy the unchanged rows
    out[0] = matrix[0]
    out[1] = matrix[1]
    out[2] = matrix[2]
    out[3] = matrix[3]
    out[12] = matrix[12]
    out[13] = matrix[13]
    out[14] = matrix[14]
    out[15] = matrix[15]
  }

  // Perform axis-specific matrix multiplication
  out[4] = a10 * c + a20 * s
  out[5] = a11 * c + a21 * s
  out[6] = a12 * c + a22 * s
  out[7] = a13 * c + a23 * s
  out[8] = a20 * c - a10 * s
  out[9] = a21 * c - a11 * s
  out[10] = a22 * c - a12 * s
  out[11] = a23 * c - a13 * s
  return out
}

module.exports = rotateX
