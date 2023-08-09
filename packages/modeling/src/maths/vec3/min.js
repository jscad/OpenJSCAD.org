/**
 * Returns the minimum coordinates of the given vectors.
 *
 * @param {Vec3} out - receiving vector
 * @param {Vec3} a - first operand
 * @param {Vec3} b - second operand
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec3.min
 */
export const min = (out, a, b) => {
  out[0] = Math.min(a[0], b[0])
  out[1] = Math.min(a[1], b[1])
  out[2] = Math.min(a[2], b[2])
  return out
}
