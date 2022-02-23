/**
 * Return the given polygon as a list of points.
 * NOTE: The returned array should not be modified as the points are shared with the geometry.
 * @param {poly3} polygon - the polygon
 * @return {Array} list of points (3D)
 * @alias module:modeling/geometries/poly3.toPoints
 */
const toPoints = (polygon) => polygon.vertices

module.exports = toPoints
