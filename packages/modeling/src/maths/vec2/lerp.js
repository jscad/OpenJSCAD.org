/**
 * Performs a linear interpolation between two vectors.
 *
 * @param {Vec2} out - receiving vector
 * @param {Vec2} a - first operand
 * @param {Vec2} b - second operand
 * @param {number} t - interpolation amount between the two vectors
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.lerp
 */
export const lerp = (out, a, b, t) => {
  const ax = a[0]
  const ay = a[1]
  out[0] = ax + t * (b[0] - ax)
  out[1] = ay + t * (b[1] - ay)
  return out
}
