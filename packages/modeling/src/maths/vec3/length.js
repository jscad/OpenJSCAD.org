/**
 * Calculates the length of a vector.
 *
 * @param {Vec3} vector - vector to calculate length of
 * @returns {number} length
 * @alias module:modeling/maths/vec3.length
 */
export const length = (vector) => {
  const x = vector[0]
  const y = vector[1]
  const z = vector[2]
  return Math.sqrt(x * x + y * y + z * z)
}
