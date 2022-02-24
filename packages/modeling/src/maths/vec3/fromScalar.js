/**
 * Creates a vector from a single scalar value.
 * All components of the resulting vector have the given value.
 *
 * @param {vec3} out - receiving vector
 * @param {Number} scalar
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.fromScalar
 */
const fromScalar = (out, scalar) => {
  out[0] = scalar
  out[1] = scalar
  out[2] = scalar
  return out
}

module.exports = fromScalar
