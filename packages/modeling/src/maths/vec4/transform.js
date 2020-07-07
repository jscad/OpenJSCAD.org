const create = require('./create')

/**
 * Transform the given vector using the given matrix.
 *
 * @param {vec4} [out] - the receiving vector (optional)
 * @param {mat4} matrix - matrix to transform with
 * @param {vec4} vector - the vector to transform
 * @returns {vec4} a new vector
 * @alias module:modeling/maths/vec4.transform
 */
const transform = (...params) => {
  let out
  let vector
  let matrix
  if (params.length === 2) {
    out = create()
    matrix = params[0]
    vector = params[1]
  } else {
    out = params[0]
    matrix = params[1]
    vector = params[2]
  }

  const [x, y, z, w] = vector

  out[0] = Math.fround(matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12] * w)
  out[1] = Math.fround(matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13] * w)
  out[2] = Math.fround(matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14] * w)
  out[3] = Math.fround(matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] * w)
  return out
}

module.exports = transform
