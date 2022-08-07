const { sin, cos } = require('../utils/trigonometry')

/**
 * Creates a matrix from the given angle around the Y axis.
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotateY(dest, dest, radians)
 *
 * @param {mat4} out - receiving matrix
 * @param {Number} radians - angle to rotate the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.fromYRotation
 * @example
 * let matrix = fromYRotation(create(), TAU / 4)
 */
const fromYRotation = (out, radians) => {
  const s = sin(radians)
  const c = cos(radians)

  // Perform axis-specific matrix multiplication
  out[0] = c
  out[1] = 0
  out[2] = -s
  out[3] = 0
  out[4] = 0
  out[5] = 1
  out[6] = 0
  out[7] = 0
  out[8] = s
  out[9] = 0
  out[10] = c
  out[11] = 0
  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1
  return out
}

module.exports = fromYRotation
