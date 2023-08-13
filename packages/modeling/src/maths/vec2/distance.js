/**
 * Calculates the distance between two vectors.
 *
 * @param {Vec2} a - first operand
 * @param {Vec2} b - second operand
 * @returns {number} distance
 * @alias module:modeling/maths/vec2.distance
 */
export const distance = (a, b) => {
  const x = b[0] - a[0]
  const y = b[1] - a[1]
  return Math.sqrt(x * x + y * y)
}
