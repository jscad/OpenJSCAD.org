/**
 * Create a new vector from the given scalar value.
 *
 * @param {Vec4} out - receiving vector
 * @param  {Number} scalar
 * @returns {Vec4} out
 * @alias module:modeling/maths/vec4.fromScalar
 */
export const fromScalar = (out, scalar) => {
  out[0] = scalar
  out[1] = scalar
  out[2] = scalar
  out[3] = scalar
  return out
}
