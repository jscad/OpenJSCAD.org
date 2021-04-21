const vec2 = require('../vec2')

/**
 * Calculate the distance (positive) between the given point and line.
 *
 * @param {line2} line - the 2D line of reference
 * @param {vec2} point - the point of reference
 * @return {Number} distance between line and point
 * @alias module:modeling/maths/line2.distanceToPoint
 */
const distanceToPoint = (line, point) => {
  let distance = vec2.dot(point, line)
  distance = Math.abs(distance - line[2])
  return distance
}

module.exports = distanceToPoint
