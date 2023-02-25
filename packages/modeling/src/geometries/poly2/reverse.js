import { create } from './create.js'

/**
 * Reverse the direction of points in the given polygon, rotating the opposite direction.
 *
 * @param {poly2} polygon - the polygon to reverse
 * @returns {poly2} a new polygon
 * @alias module:modeling/geometries/poly2.reverse
 */
export const reverse = (polygon) => {
  const points = polygon.points.slice().reverse()
  return create(points)
}
