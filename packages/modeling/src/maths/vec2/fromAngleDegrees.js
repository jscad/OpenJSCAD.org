const fromValues = require('./fromValues')

/**
 * Create a new vector in the direction of the given angle.
 * @param {Number} angle - angle in degrees
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.fromAngleDegrees
 */
const fromAngleDegrees = (degrees) => {
  const radians = Math.PI * degrees / 180
  return fromValues(Math.cos(radians), Math.sin(radians))
}

module.exports = fromAngleDegrees
