/**
 * Translate the matrix by the given offset vector.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to translate
 * @param {vec3} offsets - offset vector to translate by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.translate
 */
const translate = (out, matrix, offsets) => {
  const x = offsets[0]
  const y = offsets[1]
  const z = offsets[2]
  let a00
  let a01
  let a02
  let a03
  let a10
  let a11
  let a12
  let a13
  let a20
  let a21
  let a22
  let a23

  if (matrix === out) {
  // 0-11 assignments are unnecessary
    out[12] = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]
    out[13] = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]
    out[14] = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]
    out[15] = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15]
  } else {
    a00 = matrix[0]; a01 = matrix[1]; a02 = matrix[2]; a03 = matrix[3]
    a10 = matrix[4]; a11 = matrix[5]; a12 = matrix[6]; a13 = matrix[7]
    a20 = matrix[8]; a21 = matrix[9]; a22 = matrix[10]; a23 = matrix[11]

    out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03
    out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13
    out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23

    out[12] = a00 * x + a10 * y + a20 * z + matrix[12]
    out[13] = a01 * x + a11 * y + a21 * z + matrix[13]
    out[14] = a02 * x + a12 * y + a22 * z + matrix[14]
    out[15] = a03 * x + a13 * y + a23 * z + matrix[15]
  }

  return out
}

module.exports = translate
