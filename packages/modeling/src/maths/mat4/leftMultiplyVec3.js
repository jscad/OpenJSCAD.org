const fromValues = require('../vec3/fromValues')

/*
 * Multiply the input matrix by a Vector3 (interpreted as 3 column, 1 row)
 * (result = v*M)
 * Fourth element is set to 1
 * @param {vec3} vector the input vector
 * @param {mat4} matrix the input matrix
 * @returns {vec3} output
 */
const leftMultiplyVec3 = (vector, matrix) => {
  const [v0, v1, v2] = vector
  const v3 = 1
  let x = v0 * matrix[0] + v1 * matrix[4] + v2 * matrix[8] + v3 * matrix[12]
  let y = v0 * matrix[1] + v1 * matrix[5] + v2 * matrix[9] + v3 * matrix[13]
  let z = v0 * matrix[2] + v1 * matrix[6] + v2 * matrix[10] + v3 * matrix[14]
  const w = v0 * matrix[3] + v1 * matrix[7] + v2 * matrix[11] + v3 * matrix[15]

  // scale such that fourth element becomes 1:
  if (w !== 1) {
    const invw = 1.0 / w
    x *= invw
    y *= invw
    z *= invw
  }
  return fromValues(x, y, z)
}

module.exports = leftMultiplyVec3
