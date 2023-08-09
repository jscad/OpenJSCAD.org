import { TAU } from '../maths/constants.js'

/**
 * Calculate the number of segments from the given radius based on minimum length or angle.
 * @param {number} radius - radius of the requested shape
 * @param {number} minimumLength - minimum length of segments; length > 0
 * @param {number} minimumAngle - minimum angle (radians) between segments; 0 > angle < TAU
 * @returns {number} number of segments to complete the radius
 * @alias module:modeling/utils.radiusToSegments
 */
export const radiusToSegments = (radius, minimumLength, minimumAngle) => {
  const ss = minimumLength > 0 ? radius * TAU / minimumLength : 0
  const as = minimumAngle > 0 ? TAU / minimumAngle : 0
  // minimum segments is four(4) for round primitives
  return Math.ceil(Math.max(ss, as, 4))
}
