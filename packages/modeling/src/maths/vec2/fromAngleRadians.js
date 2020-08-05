const fromValues = require('./fromValues')

/**
 * Create a new vector in the direction of the given angle.
 * @param {Number} angle - angle in radians
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.fromAngleRadians
 */
const fromAngleRadians = (radians) => fromValues(Math.cos(radians), Math.sin(radians))

module.exports = fromAngleRadians
