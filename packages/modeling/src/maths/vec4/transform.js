/**
 * Transform the given vector using the given matrix.
 *
 * @param {vec4} out - receiving vector
 * @param {vec4} vector - vector to transform
 * @param {mat4} matrix - matrix to transform with
 * @returns {vec4} out
 * @alias module:modeling/maths/vec4.transform
 */
const transform = (out, vector, matrix) => {
  const [x, y, z, w] = vector

  out[0] = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12] * w
  out[1] = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13] * w
  out[2] = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14] * w
  out[3] = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] * w
  return out
}

module.exports = transform
