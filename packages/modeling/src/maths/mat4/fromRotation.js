const create = require('./create')

const { EPSILON } = require('./constants')

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} [out] - mat4 receiving operation result
 * @param {Number} rad - the angle to rotate the matrix by
 * @param {vec3} axis - the axis to rotate around
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.fromRotation
 */
const fromRotation = (...params) => {
  let out
  let rad
  let axis

  if (params.length === 2) {
    out = create()
    rad = params[0]
    axis = params[1]
  } else {
    out = params[0]
    rad = params[1]
    axis = params[2]
  }
  let [x, y, z] = axis
  let len = Math.sqrt(x * x + y * y + z * z)

  if (Math.abs(len) < EPSILON) { return null }

  len = 1 / len
  x *= len
  y *= len
  z *= len

  const s = Math.sin(rad)
  const c = Math.cos(rad)
  const t = 1 - c

  // Perform rotation-specific matrix multiplication
  out[0] = x * x * t + c
  out[1] = y * x * t + z * s
  out[2] = z * x * t - y * s
  out[3] = 0
  out[4] = x * y * t - z * s
  out[5] = y * y * t + c
  out[6] = z * y * t + x * s
  out[7] = 0
  out[8] = x * z * t + y * s
  out[9] = y * z * t - x * s
  out[10] = z * z * t + c
  out[11] = 0
  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1
  return out
}

module.exports = fromRotation
