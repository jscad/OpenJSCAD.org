/**
 * Calculates the absolute coordinates of the give vector.
 *
 * @param {vec3} out - receiving vector
 * @param {vec3} vector - vector of reference
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.abs
 */
export const abs = (out, vector) => {
  out[0] = Math.abs(vector[0])
  out[1] = Math.abs(vector[1])
  out[2] = Math.abs(vector[2])
  return out
}

export default abs
