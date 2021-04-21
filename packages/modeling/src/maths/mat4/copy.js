/**
 * Creates a copy of the given matrix.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to copy
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.copy
 */
const copy = (out, matrix) => {
  out[0] = matrix[0]
  out[1] = matrix[1]
  out[2] = matrix[2]
  out[3] = matrix[3]
  out[4] = matrix[4]
  out[5] = matrix[5]
  out[6] = matrix[6]
  out[7] = matrix[7]
  out[8] = matrix[8]
  out[9] = matrix[9]
  out[10] = matrix[10]
  out[11] = matrix[11]
  out[12] = matrix[12]
  out[13] = matrix[13]
  out[14] = matrix[14]
  out[15] = matrix[15]
  return out
}

module.exports = copy
