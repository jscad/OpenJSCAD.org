module.exports = rotateX
const create = require('./create')

/**
 * Rotates a matrix by the given angle around the X axis
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} angle the angle to rotate the matrix by (in radian)
 * @param {mat4} matrix the matrix to rotate
 * @returns {mat4} out
 */
function rotateX (...params) {
  let out
  let angle
  let matrix
  if (params.length === 2) {
    out = create()
    angle = params[0]
    matrix = params[1]
  } else {
    out = params[0]
    angle = params[1]
    matrix = params[2]
  }

  let s = Math.sin(angle)
  let c = Math.cos(angle)
  let a10 = matrix[4]
  let a11 = matrix[5]
  let a12 = matrix[6]
  let a13 = matrix[7]
  let a20 = matrix[8]
  let a21 = matrix[9]
  let a22 = matrix[10]
  let a23 = matrix[11]

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
};
