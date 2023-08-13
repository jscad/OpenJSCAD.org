/**
 * Calculates the absolute coordinates of the given vector.
 *
 * @param {Vec2} out - receiving vector
 * @param {Vec2} vector - vector of reference
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.abs
 */
export const abs = (out, vector) => {
  out[0] = Math.abs(vector[0])
  out[1] = Math.abs(vector[1])
  return out
}
