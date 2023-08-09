import { sin, cos } from '../utils/trigonometry.js'

/**
 * Creates a matrix from the given angle around the X axis.
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotateX(dest, dest, radians)
 *
 * @param {Mat4} out - receiving matrix
 * @param {number} radians - angle to rotate the matrix by
 * @returns {Mat4} out
 * @alias module:modeling/maths/mat4.fromXRotation
 * @example
 * let matrix = fromXRotation(create(), TAU / 4)
 */
export const fromXRotation = (out, radians) => {
  const s = sin(radians)
  const c = cos(radians)

  // Perform axis-specific matrix multiplication
  out[0] = 1
  out[1] = 0
  out[2] = 0
  out[3] = 0
  out[4] = 0
  out[5] = c
  out[6] = s
  out[7] = 0
  out[8] = 0
  out[9] = -s
  out[10] = c
  out[11] = 0
  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1
  return out
}
