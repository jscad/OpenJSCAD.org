/**
 * Calculate the number of segments from the given radius based on minimum length or angle.
 * @param {Number} radius - radius of the requested shape
 * @param {Number} minimumLength - minimum length of segments; 0 > length
 * @param {Number} minimumAngle - minimum angle (radians) between segments; 0 > angle < Math.PI * 2
 * @returns {Number} number of segments to complete the radius
 * @alias module:modeling/utils.radiusToSegments
 */
const radiusToSegments = (radius, minimumLength, minimumAngle) => {
  const ss = minimumLength > 0 ? radius * 2 * Math.PI / minimumLength : 0
  const as = minimumAngle > 0 ? Math.PI * 2 / minimumAngle : 0
  // minimum segments is four(4) for round primitives
  return Math.ceil(Math.max(ss, as, 4))
}

module.exports = radiusToSegments
