const { sin, cos } = require('../utils/trigonometry')

/**
 * Creates a matrix from the given angle around the Z axis.
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.rotateZ(dest, dest, radians)
 *
 * @param {mat4} out - receiving matrix
 * @param {Number} radians - angle to rotate the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.fromZRotation
 * @example
 * let matrix = fromZRotation(create(), TAU / 4)
 */
const fromZRotation = (out, radians) => {
  const s = sin(radians)
  const c = cos(radians)

  // Perform axis-specific matrix multiplication
  out[0] = c
  out[1] = s
  out[2] = 0
  out[3] = 0
  out[4] = -s
  out[5] = c
  out[6] = 0
  out[7] = 0
  out[8] = 0
  out[9] = 0
  out[10] = 1
  out[11] = 0
  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1
  return out
}

module.exports = fromZRotation
