/**
 * Creates a new polygon with initial values.
 *
 * @param {Array} [points] - list of points (2D)
 * @returns {Poly2} a new polygon
 * @alias module:modeling/poly2.create
 *
 * @example
 * let polygon = poly2.create([[0,0], [4,0], [4,3]])
 */
export const create = (points = []) => ({ points })
