/**
 * Calculates the squared length of the given vector.
 *
 * @param {Vec3} vector - vector to calculate squared length of
 * @returns {number} squared length
 * @alias module:modeling/maths/vec3.squaredLength
 */
export const squaredLength = (vector) => {
  const x = vector[0]
  const y = vector[1]
  const z = vector[2]
  return x * x + y * y + z * z
}
