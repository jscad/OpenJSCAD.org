/**
 * Transforms the given vector using the given matrix.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to transform
 * @param {mat4} matrix - transform matrix
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.transform
 */
const transform = (out, vector, matrix) => {
  const x = vector[0]
  const y = vector[1]
  const z = vector[2]
  let w = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15]
  w = w || 1.0
  out[0] = (matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]) / w
  out[1] = (matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]) / w
  out[2] = (matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]) / w
  return out
}

module.exports = transform
