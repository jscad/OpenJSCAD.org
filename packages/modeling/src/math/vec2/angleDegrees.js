const angleRadians = require('./angleRadians')

const { radToDeg } = require('../utils')

/**
 * Calculate the angle of the given vector.
 * @param {vec2} vector - the vector of reference
 * @returns {Number} angle in degrees
 * @alias module:modeling/math/vec2.angleDegrees
 */
const angleDegrees = (vector) => radToDeg(angleRadians(vector))

module.exports = angleDegrees
