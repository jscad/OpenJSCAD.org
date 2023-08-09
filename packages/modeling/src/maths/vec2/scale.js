/**
 * Scales the coordinates of the given vector.
 *
 * @param {Vec2} out - receiving vector
 * @param {Vec2} vector - vector to scale
 * @param {number} amount - amount to scale
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.scale
 */
export const scale = (out, vector, amount) => {
  out[0] = vector[0] * amount
  out[1] = vector[1] * amount
  return out
}
