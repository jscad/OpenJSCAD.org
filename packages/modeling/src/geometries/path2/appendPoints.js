import { equals } from '../../maths/vec2/equals.js'

import { fromPoints } from './fromPoints.js'
import { toPoints } from './toPoints.js'

/**
 * Append the given list of points to the end of the given geometry.
 *
 * @param {Array} points - the points (2D) to append to the given path
 * @param {Path2} geometry - the given path
 * @returns {Path2} a new path with the appended points
 * @alias module:modeling/path2.appendPoints
 *
 * @example
 * let newPath = path2.appendPoints([[3, 4], [4, 5]], oldPath)
 */
export const appendPoints = (points, geometry) => {
  let originalPoints = toPoints(geometry)

  if (geometry.isClosed && originalPoints.length > 1) {
    // add the closing point to the originalPoints
    originalPoints = originalPoints.slice()
    originalPoints.push(originalPoints[0])
  }

  if (originalPoints.length > 0) {
    // remove redundant points
    const lastPoint = originalPoints[originalPoints.length - 1]
    while (points.length > 0 && equals(points[0], lastPoint)) points.shift()
  }

  return fromPoints({}, originalPoints.concat(points))
}
