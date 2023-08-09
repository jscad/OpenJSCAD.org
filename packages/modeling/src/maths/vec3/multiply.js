/**
 * Multiply the coordinates of the given vectors (A*B).
 *
 * @param {Vec3} out - receiving vector
 * @param {Vec3} a - first operand
 * @param {Vec3} b - second operand
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec3.multiply
 */
export const multiply = (out, a, b) => {
  out[0] = a[0] * b[0]
  out[1] = a[1] * b[1]
  out[2] = a[2] * b[2]
  return out
}
