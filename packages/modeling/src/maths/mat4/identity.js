const create = require('./create')

/**
 * Set a matrix to the identity matrix.
 *
 * @param {mat4} [out] - the receiving matrix
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.identity
 */
const identity = (...params) => {
  let out
  if (params.length === 1) {
    out = params[0]
  } else {
    out = create()
  }
  out[0] = 1
  out[1] = 0
  out[2] = 0
  out[3] = 0
  out[4] = 0
  out[5] = 1
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

module.exports = identity
