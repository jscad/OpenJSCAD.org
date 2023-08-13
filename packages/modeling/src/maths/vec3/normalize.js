/**
 * Normalize the given vector.
 *
 * @param {Vec3} out - receiving vector
 * @param {Vec3} vector - vector to normalize
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec3.normalize
 */
export const normalize = (out, vector) => {
  const x = vector[0]
  const y = vector[1]
  const z = vector[2]
  let len = x * x + y * y + z * z
  if (len > 0) {
    len = 1 / Math.sqrt(len)
  }
  out[0] = x * len
  out[1] = y * len
  out[2] = z * len
  return out
}
