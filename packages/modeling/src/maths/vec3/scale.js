/**
 * Scales the coordinates of the given vector by a scalar number.
 *
 * @param {Vec3} out - receiving vector
 * @param {Vec3} vector - vector to scale
 * @param {number} amount - amount to scale the vector by
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec3.scale
 */
export const scale = (out, vector, amount) => {
  out[0] = vector[0] * amount
  out[1] = vector[1] * amount
  out[2] = vector[2] * amount
  return out
}
