import { sin, cos } from '../utils/trigonometry.js'

/**
 * Create a new vector in the direction of the given angle.
 *
 * @param {Vec2} out - receiving vector
 * @param {number} radians - angle in radians
 * @returns {Vec2} out
 * @alias module:modeling/maths/vec2.fromAngleRadians
 */
export const fromAngleRadians = (out, radians) => {
  out[0] = cos(radians)
  out[1] = sin(radians)
  return out
}
