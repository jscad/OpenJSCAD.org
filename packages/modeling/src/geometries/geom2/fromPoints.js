import * as vec2 from '../../maths/vec2/index.js'

import create from './create.js'

/**
 * Create a new 2D geometry from the given points.
 * The direction (rotation) of the points is not relevant,
 * as the points can define a convex or a concave polygon.
 * The geometry must not self intersect, i.e. the sides cannot cross.
 * @param {Array} points - list of points in 2D space
 * @returns {geom2} a new geometry
 * @alias module:modeling/geometries/geom2.fromPoints
 */
export const fromPoints = (points) => {
  if (!Array.isArray(points)) {
    throw new Error('the given points must be an array')
  }
  let length = points.length
  if (length < 3) {
    throw new Error('the given points must define a closed geometry with three or more points')
  }
  // adjust length if the given points are closed by the same point
  if (vec2.equals(points[0], points[length - 1])) points.length--

  return create([points])
}

export default fromPoints
