/**
 * Adds the two matrices (A+B).
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} a - first operand
 * @param {mat4} b - second operand
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.add
 */
const add = (out, a, b) => {
  out[0] = a[0] + b[0]
  out[1] = a[1] + b[1]
  out[2] = a[2] + b[2]
  out[3] = a[3] + b[3]
  out[4] = a[4] + b[4]
  out[5] = a[5] + b[5]
  out[6] = a[6] + b[6]
  out[7] = a[7] + b[7]
  out[8] = a[8] + b[8]
  out[9] = a[9] + b[9]
  out[10] = a[10] + b[10]
  out[11] = a[11] + b[11]
  out[12] = a[12] + b[12]
  out[13] = a[13] + b[13]
  out[14] = a[14] + b[14]
  out[15] = a[15] + b[15]
  return out
}

module.exports = add
