/**
 * Return the given polygon as a list of points.
 *
 * NOTE: The returned array should not be modified as the points are shared with the geometry.
 *
 * @param {Poly2} polygon - the polygon
 * @return {Array} list of points (2D)
 * @alias module:modeling/poly2.toPoints
 *
 * @example
 * const sharedPoints = poly2.toPoints(geometry)
 */
export const toPoints = (polygon) => polygon.points
