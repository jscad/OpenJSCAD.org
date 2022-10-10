import * as vec3 from '../vec3/index.js'

import closestPoint from './closestPoint.js'

/**
 * Calculate the distance (positive) between the given point and line.
 *
 * @param {line3} line - line of reference
 * @param {vec3} point - point of reference
 * @return {Number} distance between line and point
 * @alias module:modeling/maths/line3.distanceToPoint
 */
export const distanceToPoint = (line, point) => {
  const closest = closestPoint(line, point)
  const distancevector = vec3.subtract(vec3.create(), point, closest)
  return vec3.length(distancevector)
}

export default distanceToPoint
