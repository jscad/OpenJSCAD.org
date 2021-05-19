/**
 * Divides the coordinates of two vectors (A/B).
 *
 * @param {vec3} out - the receiving vector
 * @param {vec3} a - the dividend vector
 * @param {vec3} b - the divisor vector
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.divide
 */
const divide = (out, a, b) => {
  out[0] = a[0] / b[0]
  out[1] = a[1] / b[1]
  out[2] = a[2] / b[2]
  return out
}

module.exports = divide
