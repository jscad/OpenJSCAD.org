const { sin, cos } = require('../utils/trigonometry')

/**
 * Create a new vector in the direction of the given angle.
 *
 * @param {vec2} out - receiving vector
 * @param {Number} radians - angle in radians
 * @returns {vec2} out
 * @alias module:modeling/maths/vec2.fromAngleRadians
 */
const fromAngleRadians = (out, radians) => {
  out[0] = cos(radians)
  out[1] = sin(radians)
  return out
}

module.exports = fromAngleRadians
