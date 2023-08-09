/**
 * Computes the cross product of the given vectors (AxB).
 *
 * @param {Vec3} out - receiving vector
 * @param {Vec3} a - first operand
 * @param {Vec3} b - second operand
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec3.cross
 */
export const cross = (out, a, b) => {
  const ax = a[0]
  const ay = a[1]
  const az = a[2]
  const bx = b[0]
  const by = b[1]
  const bz = b[2]

  out[0] = ay * bz - az * by
  out[1] = az * bx - ax * bz
  out[2] = ax * by - ay * bx
  return out
}
