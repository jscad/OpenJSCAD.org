const create = require('./create')

/**
 * Rotates a matrix by the given angle about the given axis.
 *
 * @param {mat4} [out] - the receiving matrix
 * @param {Number} rad - the angle to rotate the matrix by
 * @param {vec3} axis - the axis to rotate around
 * @param {mat4} matrix - the matrix to rotate
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.rotate
 */
const rotate = (...params) => {
  let out
  let matrix
  let rad
  let axis
  if (params.length === 3) {
    out = create()
    rad = params[0]
    axis = params[1]
    matrix = params[2]
  } else {
    out = params[0]
    rad = params[1]
    axis = params[2]
    matrix = params[3]
  }

  let [x, y, z] = axis
  let len = Math.sqrt(x * x + y * y + z * z)

  if (Math.abs(len) < 0.000001) { return null }

  len = 1 / len
  x *= len
  y *= len
  z *= len

  const s = Math.sin(rad)
  const c = Math.cos(rad)
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
