/**
 * Return the given polygon as a list of points.
 * NOTE: The returned array should not be modified as the points are shared with the geometry.
 * @param {poly2} polygon - the polygon
 * @return {Array} list of points (2D)
 * @alias module:modeling/geometries/poly2.toPoints
 */
export const toPoints = (polygon) => polygon.vertices

export default toPoints
