const fromAngleRadians = require('./fromAngleRadians')

/**
 * Create a new vector in the direction of the given angle.
 *
 * @param {vec2} out - the receiving vector
 * @param {Number} angle - the angle in degrees
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.fromAngleDegrees
 */
const fromAngleDegrees = (out, degrees) => fromAngleRadians(out, Math.PI * degrees / 180)

module.exports = fromAngleDegrees
