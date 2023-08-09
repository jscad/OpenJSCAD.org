import { angleRadians } from './angleRadians.js'

/**
 * Calculate the angle of the given vector.
 *
 * @param {Vec2} vector - vector of reference
 * @returns {number} angle in degrees
 * @alias module:modeling/maths/vec2.angleDegrees
 */
export const angleDegrees = (vector) => angleRadians(vector) * 57.29577951308232
