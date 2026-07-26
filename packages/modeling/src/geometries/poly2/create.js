/**
 * Represents a 2D polygon consisting of a list of ordered points.
 *
 * @typedef {Object} Poly2
 * @property {Array} points - list of ordered points (2D)
 *
 * @example
 * // data structure
 * {
 *   points: [[0,0], [4,0], [4,3]],
 * }
 */

/**
 * Creates a new polygon with the given points, or empty.
 *
 * @param {Array} [points] - list of points (2D)
 * @returns {Poly2} a new polygon
 * @alias module:modeling/poly2.create
 *
 * @example
 * let polygon = poly2.create([[0,0], [4,0], [4,3]])
 */
export const create = (points = []) => ({ points })
