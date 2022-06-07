const { EPS } = require('../constants')

const { sin, cos } = require('../utils/trigonometry')

const copy = require('./copy')

/**
 * Rotates a matrix by the given angle about the given axis.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to rotate
 * @param {Number} radians - angle to rotate the matrix by
 * @param {vec3} axis - axis to rotate around
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.rotate
 */
const rotate = (out, matrix, radians, axis) => {
  let [x, y, z] = axis
  const lengthSquared = x * x + y * y + z * z

  if (Math.abs(lengthSquared) < EPS) {
    // axis is 0,0,0 or almost
    return copy(out, matrix)
  }

  const len = 1 / Math.sqrt(lengthSquared)
  x *= len
  y *= len
  z *= len

  const s = sin(radians)
  const c = cos(radians)
  const t = 1 - c

  const a00 = matrix[0]
  const a01 = matrix[1]
  const a02 = matrix[2]
  const a03 = matrix[3]
  const a10 = matrix[4]
  const a11 = matrix[5]
  const a12 = matrix[6]
  const a13 = matrix[7]
  const a20 = matrix[8]
  const a21 = matrix[9]
  const a22 = matrix[10]
  const a23 = matrix[11]

  // Construct the elements of the rotation matrix
  const b00 = x * x * t + c
  const b01 = y * x * t + z * s
  const b02 = z * x * t - y * s
  const b10 = x * y * t - z * s
  const b11 = y * y * t + c
  const b12 = z * y * t + x * s
  const b20 = x * z * t + y * s
  const b21 = y * z * t - x * s
  const b22 = z * z * t + c

  // Perform rotation-specific matrix multiplication
  out[0] = a00 * b00 + a10 * b01 + a20 * b02
  out[1] = a01 * b00 + a11 * b01 + a21 * b02
  out[2] = a02 * b00 + a12 * b01 + a22 * b02
  out[3] = a03 * b00 + a13 * b01 + a23 * b02
  out[4] = a00 * b10 + a10 * b11 + a20 * b12
  out[5] = a01 * b10 + a11 * b11 + a21 * b12
  out[6] = a02 * b10 + a12 * b11 + a22 * b12
  out[7] = a03 * b10 + a13 * b11 + a23 * b12
  out[8] = a00 * b20 + a10 * b21 + a20 * b22
  out[9] = a01 * b20 + a11 * b21 + a21 * b22
  out[10] = a02 * b20 + a12 * b21 + a22 * b22
  out[11] = a03 * b20 + a13 * b21 + a23 * b22

  if (matrix !== out) { // If the source and destination differ, copy the unchanged last row
    out[12] = matrix[12]
    out[13] = matrix[13]
    out[14] = matrix[14]
    out[15] = matrix[15]
  }
  return out
}

module.exports = rotate
