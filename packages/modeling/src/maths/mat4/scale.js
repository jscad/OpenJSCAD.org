/**
 * Scales the matrix by the given dimensions.
 *
 * @param {mat4} out - receiving matrix
 * @param {mat4} matrix - matrix to scale
 * @param {vec3} dimensions - dimensions to scale the matrix by
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.scale
 */
const scale = (out, matrix, dimensions) => {
  const x = dimensions[0]
  const y = dimensions[1]
  const z = dimensions[2]

  out[0] = matrix[0] * x
  out[1] = matrix[1] * x
  out[2] = matrix[2] * x
  out[3] = matrix[3] * x
  out[4] = matrix[4] * y
  out[5] = matrix[5] * y
  out[6] = matrix[6] * y
  out[7] = matrix[7] * y
  out[8] = matrix[8] * z
  out[9] = matrix[9] * z
  out[10] = matrix[10] * z
  out[11] = matrix[11] * z
  out[12] = matrix[12]
  out[13] = matrix[13]
  out[14] = matrix[14]
  out[15] = matrix[15]
  return out
}

module.exports = scale
