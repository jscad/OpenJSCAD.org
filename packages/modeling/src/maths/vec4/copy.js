/**
 * Create a copy of the given vector.
 *
 * @param {Vec4} out - receiving vector
 * @param {Vec4} vector - source vector
 * @returns {Vec4} out
 * @alias module:modeling/maths/vec4.copy
 */
export const copy = (out, vector) => {
  out[0] = vector[0]
  out[1] = vector[1]
  out[2] = vector[2]
  out[3] = vector[3]
  return out
}
