import { EPS } from '../../maths/constants.js'

import { distance } from '../../maths/vec2/distance.js'

import { close } from './close.js'
import { create } from './create.js'

/**
 * Create a new path from the given points.
 *
 * The points must be provided an array of points,
 * where each point is an array of two numbers.
 *
 * @param {Object} options - options for construction
 * @param {Boolean} [options.closed=false] - if the path should be open or closed
 * @param {Array} points - array of points (2D) from which to create the path
 * @returns {Path2} a new path
 * @alias module:modeling/path2.fromPoints
 *
 * @example
 * let newPath = path2.fromPoints({closed: true}, [[10, 10], [-10, 10]])
 */
export const fromPoints = (options, points) => {
  let {
    closed = false
  } = options

  let created = create(points.slice())

  // check if first and last points are equal
  if (created.points.length > 1) {
    const p0 = created.points[0]
    const pn = created.points[created.points.length - 1]
    if (distance(p0, pn) < EPS) {
      // and close automatically
      closed = true
    }
  }
  if (closed === true) created = close(created)

  return created
}
