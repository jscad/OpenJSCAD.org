/**
 * Calculates the squared distance between two vectors.
 *
 * @param {Vec3} a - first operand
 * @param {Vec3} b - second operand
 * @returns {number} squared distance
 * @alias module:modeling/maths/vec3.squaredDistance
 */
export const squaredDistance = (a, b) => {
  const x = b[0] - a[0]
  const y = b[1] - a[1]
  const z = b[2] - a[2]
  return x * x + y * y + z * z
}
