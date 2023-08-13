/**
 * Computes the cross product (3D) of two vectors.
 *
 * @param {Vec3} out - receiving vector (3D)
 * @param {Vec2} a - first operand
 * @param {Vec2} b - second operand
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec2.cross
 */
export const cross = (out, a, b) => {
  out[0] = 0
  out[1] = 0
  out[2] = a[0] * b[1] - a[1] * b[0]
  return out
}
