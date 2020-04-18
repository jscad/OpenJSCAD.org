const fromValues = require('../vec3/fromValues')

/**
 * Multiply the input matrix by a Vector3 (interpreted as 3 row, 1 column)
 * (result = M*v)
 * Fourth element is set to 1
 * @param {vec3} vector the input vector
 * @param {mat4} matrix the input matrix
 * @returns {vec3} output
 */
const rightMultiplyVec3 = (vector, matrix) => {
  const [v0, v1, v2] = vector
  const v3 = 1
  let x = v0 * matrix[0] + v1 * matrix[1] + v2 * matrix[2] + v3 * matrix[3]
  let y = v0 * matrix[4] + v1 * matrix[5] + v2 * matrix[6] + v3 * matrix[7]
  let z = v0 * matrix[8] + v1 * matrix[9] + v2 * matrix[10] + v3 * matrix[11]
  const w = v0 * matrix[12] + v1 * matrix[13] + v2 * matrix[14] + v3 * matrix[15]

  // scale such that fourth element becomes 1:
  if (w !== 1) {
    const invw = 1.0 / w
    x *= invw
    y *= invw
    z *= invw
  }
  return fromValues(x, y, z)
}

module.exports = rightMultiplyVec3
