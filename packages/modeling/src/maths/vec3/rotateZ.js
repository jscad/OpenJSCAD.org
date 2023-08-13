/**
 * Rotate the given vector around the given origin, Z axis only.
 *
 * @param {Vec3} out - receiving vector
 * @param {Vec3} vector - vector to rotate
 * @param {Vec3} origin - origin of the rotation
 * @param {number} radians - angle of rotation in radians
 * @returns {Vec3} out
 * @alias module:modeling/maths/vec3.rotateZ
 */
export const rotateZ = (out, vector, origin, radians) => {
  const p = []
  const r = []
  // Translate point to the origin
  p[0] = vector[0] - origin[0]
  p[1] = vector[1] - origin[1]

  // perform rotation
  r[0] = (p[0] * Math.cos(radians)) - (p[1] * Math.sin(radians))
  r[1] = (p[0] * Math.sin(radians)) + (p[1] * Math.cos(radians))

  // translate to correct position
  out[0] = r[0] + origin[0]
  out[1] = r[1] + origin[1]
  out[2] = vector[2]

  return out
}
