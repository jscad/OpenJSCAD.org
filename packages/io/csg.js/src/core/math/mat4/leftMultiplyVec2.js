const fromValues = require('../vec2/fromValues')

/**
 * Multiply the input matrix by a Vector2 (interpreted as 2 column, 1 row)
 * (result = v*M)
 * Fourth element is set to 1
 * @param {vec2} vector the input vector
 * @param {mat4} matrix the input matrix
 * @returns {mat4} output
 */
function leftMultiplyVec2 (vector, matrix) {
  const [v0, v1] = vector
  let v2 = 0
  let v3 = 1
  let x = v0 * matrix[0] + v1 * matrix[4] + v2 * matrix[8] + v3 * matrix[12]
  let y = v0 * matrix[1] + v1 * matrix[5] + v2 * matrix[9] + v3 * matrix[13]
  let w = v0 * matrix[3] + v1 * matrix[7] + v2 * matrix[11] + v3 * matrix[15]
      // scale such that fourth element becomes 1:
  if (w !== 1) {
    let invw = 1.0 / w
    x *= invw
    y *= invw
  }
  return fromValues(x, y)
}
module.exports = leftMultiplyVec2
