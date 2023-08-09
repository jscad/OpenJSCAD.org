/**
 * Create a copy of the given vector.
 *
 * @param {Vec2} out - receiving vector
 * @param {Vec2} vector - source vector
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.copy
 */
export const copy = (out, vector) => {
  out[0] = vector[0]
  out[1] = vector[1]
  return out
}
