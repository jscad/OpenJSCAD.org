import * as vec3 from '../../maths/vec3/index.js'

import create from './create.js'

/**
 * Create a slice from the given points.
 *
 * @param {Array} points - list of points, where each point is either 2D or 3D
 * @returns {slice} a new slice
 * @alias module:modeling/geometries/slice.fromPoints
 *
 * @example
 * const points = [
 *   [0,  0],
 *   [0, 10],
 *   [0, 10]
 * ]
 * const slice = fromPoints(points)
 */
export const fromPoints = (points) => {
  if (!Array.isArray(points)) throw new Error('the given points must be an array')
  if (points.length < 3) throw new Error('the given points must contain THREE or more points')

  // Convert from 2D points to 3D if needed
  const cloned = points.map((point) => {
    if (point.length === 3) {
      return point
    } else {
      return vec3.fromVec2(vec3.create(), point)
    }
  })
  return create([cloned])
}

export default fromPoints
