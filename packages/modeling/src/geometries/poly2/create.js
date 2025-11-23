/**
 * Represents a 2D polygon consisting of a list of ordered points
 * which is closed between start and end points.
 * @see https://en.wikipedia.org/wiki/Polygon
 * @property {Array} points - list of ordered points (2D)
 */

/**
 * Creates a new polygon with initial values.
 *
 * @param {Array} [points] - list of points (2D)
 * @returns {Poly2} a new polygon
 * @alias module:modeling/geometries/poly2.create
 *
 * @example
 * let polygon = create([[0,0], [4,0], [4,3]])
 */
export const create = (points = []) => ({ points })
