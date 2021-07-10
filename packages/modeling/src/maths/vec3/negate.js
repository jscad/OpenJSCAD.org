/**
 * Negates the coordinates of the given vector.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector to negate
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.negate
 */
const negate = (out, vector) => {
  out[0] = -vector[0]
  out[1] = -vector[1]
  out[2] = -vector[2]
  return out
}

module.exports = negate
