import { create } from './create.js'

/**
 * Reverse the direction of points in the given polygon, rotating the opposite direction.
 *
 * @param {Poly2} polygon - the polygon to reverse
 * @returns {Poly2} a new polygon
 * @alias module:modeling/poly2.reverse
 *
 * @example
 * let newPoly = poly2.reverse(oldPoly)
 */
export const reverse = (polygon) => {
  const points = polygon.points.slice().reverse()
  return create(points)
}
