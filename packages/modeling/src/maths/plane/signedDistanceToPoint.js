const vec3 = require('../vec3')

/**
 * Calculate the distance to the given point.
 *
 * @param {plane} plane - plane of reference
 * @param {vec3} point - point of reference
 * @return {Number} signed distance to point
 * @alias module:modeling/maths/plane.signedDistanceToPoint
 */
const signedDistanceToPoint = (plane, point) => vec3.dot(plane, point) - plane[3]

module.exports = signedDistanceToPoint
