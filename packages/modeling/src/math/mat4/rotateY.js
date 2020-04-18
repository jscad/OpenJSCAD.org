const create = require('./create')

/**
 * Rotates a matrix by the given angle around the Y axis
 *
 * @param {mat4} [out] - the receiving matrix
 * @param {Number} angle - the angle to rotate the matrix by (in radian)
 * @param {mat4} matrix - the matrix to rotate
 * @returns {mat4} out
 */
const rotateY = (...params) => {
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
  const s = Math.sin(angle)
  const c = Math.cos(angle)
  const a00 = matrix[0]
  const a01 = matrix[1]
  const a02 = matrix[2]
  const a03 = matrix[3]
  const a20 = matrix[8]
  const a21 = matrix[9]
  const a22 = matrix[10]
  const a23 = matrix[11]

  if (matrix !== out) { // If the source and destination differ, copy the unchanged rows
    out[4] = matrix[4]
    out[5] = matrix[5]
    out[6] = matrix[6]
    out[7] = matrix[7]
    out[12] = matrix[12]
    out[13] = matrix[13]
    out[14] = matrix[14]
    out[15] = matrix[15]
  }

  // Perform axis-specific matrix multiplication
  out[0] = a00 * c - a20 * s
  out[1] = a01 * c - a21 * s
  out[2] = a02 * c - a22 * s
  out[3] = a03 * c - a23 * s
  out[8] = a00 * s + a20 * c
  out[9] = a01 * s + a21 * c
  out[10] = a02 * s + a22 * c
  out[11] = a03 * s + a23 * c
  return out
}

module.exports = rotateY
