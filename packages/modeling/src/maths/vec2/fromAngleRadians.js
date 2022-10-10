import { sin, cos } from '../utils/trigonometry.js'

/**
 * Create a new vector in the direction of the given angle.
 *
 * @param {vec2} out - receiving vector
 * @param {Number} radians - angle in radians
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.fromAngleRadians
 */
export const fromAngleRadians = (out, radians) => {
  out[0] = cos(radians)
  out[1] = sin(radians)
  return out
}

export default fromAngleRadians
