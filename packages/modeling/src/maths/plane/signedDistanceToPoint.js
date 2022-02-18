const vec3 = require('../vec3')

/**
 * Calculate the distance to the given point.
 *
 * @param {plane} plane - plane of reference
 * @param {vec3} vec - point of reference
 * @return {Number} signed distance to point
 * @alias module:modeling/maths/plane.signedDistanceToPoint
 */
const signedDistanceToPoint = (plane, vec) => vec3.dot(plane, vec) - plane[3]

module.exports = signedDistanceToPoint
