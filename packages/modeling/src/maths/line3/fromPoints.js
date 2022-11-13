import * as vec3 from '../vec3/index.js'

import fromPointAndDirection from './fromPointAndDirection.js'

/**
 * Create a line that passes through the given points.
 *
 * @param {line3} out - receiving line
 * @param {vec3} point1 - start point of the line segment
 * @param {vec3} point2 - end point of the line segment
 * @returns {line3} out
 * @alias module:modeling/maths/line3.fromPoints
 */
export const fromPoints = (out, point1, point2) => {
  const direction = vec3.subtract(vec3.create(), point2, point1)
  return fromPointAndDirection(out, point1, direction)
}

export default fromPoints
