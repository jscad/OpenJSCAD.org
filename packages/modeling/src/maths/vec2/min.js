/**
 * Returns the minimum coordinates of two vectors.
 *
 * @param {Vec2} out - receiving vector
 * @param {Vec2} a - first operand
 * @param {Vec2} b - second operand
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.min
 */
export const min = (out, a, b) => {
  out[0] = Math.min(a[0], b[0])
  out[1] = Math.min(a[1], b[1])
  return out
}
