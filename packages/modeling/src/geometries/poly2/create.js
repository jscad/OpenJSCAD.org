/**
 * Represents a 2D polygon consisting of a list of ordered points
 * which is closed between start and end points.
 * @see https://en.wikipedia.org/wiki/Polygon
 * @typedef {Object} poly2
 * @property {Array} points - list of ordered points (2D)
 */

/**
 * Creates a new polygon with initial values.
 *
 * @param {Array} [points] - list of points (2D)
 * @returns {poly2} a new polygon
 * @alias module:modeling/geometries/poly2.create
 *
 * @example
 * let polygon = create()
 */
export const create = (points) => {
  if (points === undefined || points.length < 3) {
    points = [] // empty contents
  }
  return { points }
}

export default create
