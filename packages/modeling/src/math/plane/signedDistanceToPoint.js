const vec3 = require('../vec3')

/**
 * Calculate the distance to the given point
 * @return {Number} signed distance to point
 */
const signedDistanceToPoint = (plane, vector) => {
  return vec3.dot(plane, vector) - plane[3]
}

module.exports = signedDistanceToPoint
