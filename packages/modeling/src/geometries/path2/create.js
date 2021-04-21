const mat4 = require('../../maths/mat4')

/**
 * Represents a 2D geometry consisting of a list of ordered points.
 * @typedef {Object} path2
 * @property {Array} points - list of ordered points
 * @property {Boolean} isClosed - true if the path is closed where start and end points are the same
 * @property {mat4} transforms - transforms to apply to the points, see transform()
 */

/**
 * Create an empty, open path.
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.create
 *
 * @example
 * let newpath = create()
 */
const create = (points) => {
  if (points === undefined) {
    points = []
  }
  return {
    points: points,
    isClosed: false,
    transforms: mat4.create()
  }
}

module.exports = create
