/**
 * Snaps the coordinates of the given vector to the given epsilon.
 *
 * @param {Vec3} out - receiving vector
 * @param {Vec3} vector - vector to snap
 * @param {number} epsilon - epsilon of precision, less than 0
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec3.snap
 */
export const snap = (out, vector, epsilon) => {
  out[0] = Math.round(vector[0] / epsilon) * epsilon + 0
  out[1] = Math.round(vector[1] / epsilon) * epsilon + 0
  out[2] = Math.round(vector[2] / epsilon) * epsilon + 0
  return out
}
