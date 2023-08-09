/**
 * Rotates the given vector by the given angle.
 *
 * @param {Vec2} out - receiving vector
 * @param {Vec2} vector - vector to rotate
 * @param {Vec2} origin - origin of the rotation
 * @param {number} radians - angle of rotation (radians)
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.rotate
 */
export const rotate = (out, vector, origin, radians) => {
  const x = vector[0] - origin[0]
  const y = vector[1] - origin[1]
  const c = Math.cos(radians)
  const s = Math.sin(radians)

  out[0] = x * c - y * s + origin[0]
  out[1] = x * s + y * c + origin[1]

  return out
}
