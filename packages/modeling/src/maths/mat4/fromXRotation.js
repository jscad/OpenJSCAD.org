const create = require('./create')

/**
 * Creates a matrix from the given angle around the X axis.
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} [out] - mat4 receiving operation result
 * @param {Number} rad - the angle to rotate the matrix by
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.fromXRotation
 */
const fromXRotation = (...params) => {
  let out
  let rad
  if (params.length === 1) {
    out = create()
    rad = params[0]
  } else {
    out = params[0]
    rad = params[1]
  }
  const s = Math.sin(rad)
  const c = Math.cos(rad)

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

module.exports = fromXRotation
