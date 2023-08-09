import * as vec2 from '../vec2/index.js'

/**
 * Calculate the distance (positive) between the given point and line.
 *
 * @param {Line2} line - line of reference
 * @param {Vec2} point - point of reference
 * @return {number} distance between line and point
 * @alias module:modeling/maths/line2.distanceToPoint
 */
export const distanceToPoint = (line, point) => {
  let distance = vec2.dot(point, line)
  distance = Math.abs(distance - line[2])
  return distance
}
