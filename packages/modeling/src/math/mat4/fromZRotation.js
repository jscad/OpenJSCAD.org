const create = require('./create')

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} [out] - mat4 receiving operation result
 * @param {Number} rad - the angle to rotate the matrix by
 * @returns {mat4} out
 */
const fromZRotation = (...params) => {
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
