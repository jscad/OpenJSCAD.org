/**
 * Rotates the given vector by the given angle.
 *
 * @param {vec2} out - the receiving vector
 * @param {vec2} vector - the vector to rotate
 * @param {vec2} origin - the origin of the rotation
 * @param {Number} radians - the angle of rotation (radians)
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.rotate
 */
const rotate = (out, vector, origin, radians) => {
  const x = vector[0] - origin[0]
  const y = vector[1] - origin[0]
  const c = Math.cos(radians)
  const s = Math.sin(radians)

  out[0] = x * c - y * s + origin[0]
  out[1] = x * s + y * c + origin[1]

  return out
}

module.exports = rotate
