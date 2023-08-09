import { create } from './create.js'

/**
 * Create a matrix with the given values.
 *
 * @param {number} m00 Component in column 0, row 0 position (index 0)
 * @param {number} m01 Component in column 0, row 1 position (index 1)
 * @param {number} m02 Component in column 0, row 2 position (index 2)
 * @param {number} m03 Component in column 0, row 3 position (index 3)
 * @param {number} m10 Component in column 1, row 0 position (index 4)
 * @param {number} m11 Component in column 1, row 1 position (index 5)
 * @param {number} m12 Component in column 1, row 2 position (index 6)
 * @param {number} m13 Component in column 1, row 3 position (index 7)
 * @param {number} m20 Component in column 2, row 0 position (index 8)
 * @param {number} m21 Component in column 2, row 1 position (index 9)
 * @param {number} m22 Component in column 2, row 2 position (index 10)
 * @param {number} m23 Component in column 2, row 3 position (index 11)
 * @param {number} m30 Component in column 3, row 0 position (index 12)
 * @param {number} m31 Component in column 3, row 1 position (index 13)
 * @param {number} m32 Component in column 3, row 2 position (index 14)
 * @param {number} m33 Component in column 3, row 3 position (index 15)
 * @returns {Mat4} a new matrix
 * @alias module:modeling/maths/mat4.fromValues
 * @example
 * let matrix = fromValues(
 *   1, 0, 0, 1,
 *   0, 1, 0, 0,
 *   0, 0, 1, 0,
 *   0, 0, 0, 1
 * )
 */
export const fromValues = (m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) => {
  const out = create()
  out[0] = m00
  out[1] = m01
  out[2] = m02
  out[3] = m03
  out[4] = m10
  out[5] = m11
  out[6] = m12
  out[7] = m13
  out[8] = m20
  out[9] = m21
  out[10] = m22
  out[11] = m23
  out[12] = m30
  out[13] = m31
  out[14] = m32
  out[15] = m33
  return out
}
