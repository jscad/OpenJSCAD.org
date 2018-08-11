module.exports = signedDistanceToPoint
const vec3 = require('../vec3')

/**
 * Calculate the distance to the given point
 * @return {Number} signed distance to point
 */
function signedDistanceToPoint (plane, vector) {
  return vec3.dot(plane, vector) - plane[3]
}
