/**
 * Negates the coordinates of the given vector.
 *
 * @param {Vec3} out - receiving vector
 * @param {Vec3} vector - vector to negate
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec3.negate
 */
export const negate = (out, vector) => {
  out[0] = -vector[0]
  out[1] = -vector[1]
  out[2] = -vector[2]
  return out
}
