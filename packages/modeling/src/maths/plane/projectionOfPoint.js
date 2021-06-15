const vec3 = require('../vec3')

/**
 * Project the given point on to the given plane.
 *
 * @param {plane} plane - plane of reference
 * @param {vec3} point - point of reference
 * @return {vec3} projected point on plane
 * @alias module:modeling/maths/plane.projectionOfPoint
 */
const projectionOfPoint = (plane, point) => {
  const a = point[0] * plane[0] + point[1] * plane[1] + point[2] * plane[2] - plane[3]
  const x = point[0] - a * plane[0]
  const y = point[1] - a * plane[1]
  const z = point[2] - a * plane[2]
  return vec3.fromValues(x, y, z)
}

module.exports = projectionOfPoint
