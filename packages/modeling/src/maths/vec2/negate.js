/**
 * Negates the coordinates of the given vector.
 *
 * @param {Vec2} out - receiving vector
 * @param {Vec2} vector - vector to negate
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.negate
 */
export const negate = (out, vector) => {
  out[0] = -vector[0]
  out[1] = -vector[1]
  return out
}
