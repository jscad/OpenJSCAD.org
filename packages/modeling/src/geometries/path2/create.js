import * as mat4 from '../../maths/mat4/index.js'

/**
 * Represents a 2D geometry consisting of a list of ordered points.
 * @property {Array} points - list of ordered points
 * @property {boolean} isClosed - true if the path is closed where start and end points are the same
 * @property {Mat4} transforms - transforms to apply to the points, see transform()
 * @example
 * {
 *   "points": [[0,0], [4,0], [4,3]],
 *   "isClosed": true,
 *   "transforms": [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
 * }
 */

/**
 * Create an empty, open path.
 * @returns {Path2} a new path
 * @alias module:modeling/geometries/path2.create
 *
 * @example
 * let newPath = create()
 */
export const create = (points) => {
  if (points === undefined) {
    points = []
  }
  return {
    points: points,
    isClosed: false,
    transforms: mat4.create()
  }
}
