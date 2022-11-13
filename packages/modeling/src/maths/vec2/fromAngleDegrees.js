import fromAngleRadians from './fromAngleRadians.js'

/**
 * Create a new vector in the direction of the given angle.
 *
 * @param {vec2} out - receiving vector
 * @param {Number} degrees - angle in degrees
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.fromAngleDegrees
 */
export const fromAngleDegrees = (out, degrees) => fromAngleRadians(out, degrees * 0.017453292519943295)

export default fromAngleDegrees
