const create = require('./create')

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} [out] - mat4 receiving operation result
 * @param {vec3} v - Scaling vector
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.fromScaling
 */
const fromScaling = (...params) => {
  let out
  let v
  if (params.length === 1) {
    out = create()
    v = params[0]
  } else {
    out = params[0]
    v = params[1]
  }
  out[0] = v[0]
  out[1] = 0
  out[2] = 0
  out[3] = 0
  out[4] = 0
  out[5] = v[1]
  out[6] = 0
  out[7] = 0
  out[8] = 0
  out[9] = 0
  out[10] = v[2]
  out[11] = 0
  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1
  return out
}

module.exports = fromScaling
