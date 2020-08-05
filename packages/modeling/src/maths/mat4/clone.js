const create = require('./create')

/**
 * Creates a clone of the given matrix.
 *
 * @param {mat4} [out] - receiving matrix
 * @param {mat4} matrix - matrix to clone
 * @returns {mat4} a new matrix
 * @alias module:modeling/maths/mat4.clone
 */
const clone = (...params) => {
  let out, a
  if (params.length === 1) {
    out = create()
    a = params[0]
  } else {
    out = params[0]
    a = params[1]
  }
  out[0] = a[0]
  out[1] = a[1]
  out[2] = a[2]
  out[3] = a[3]
  out[4] = a[4]
  out[5] = a[5]
  out[6] = a[6]
  out[7] = a[7]
  out[8] = a[8]
  out[9] = a[9]
  out[10] = a[10]
  out[11] = a[11]
  out[12] = a[12]
  out[13] = a[13]
  out[14] = a[14]
  out[15] = a[15]
  return out
}

module.exports = clone
