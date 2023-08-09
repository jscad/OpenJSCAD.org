/**
 * Performs a linear interpolation between two vectors.
 *
 * @param {Vec3} out - receiving vector
 * @param {Vec3} a - first operand
 * @param {Vec3} b - second operand
 * @param {number} t - interpolant (0.0 to 1.0) applied between the two inputs
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec3.lerp
 */
export const lerp = (out, a, b, t) => {
  out[0] = a[0] + t * (b[0] - a[0])
  out[1] = a[1] + t * (b[1] - a[1])
  out[2] = a[2] + t * (b[2] - a[2])
  return out
}
