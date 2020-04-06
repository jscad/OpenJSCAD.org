const applyTransforms = require('./applyTransforms')

/**
 * Produces an array of polygons from the given geometry, after applying transforms.
 * The returned array should not be modified as the polygons are shared with the geometry.
 * @param {geom3} geometry - the geometry
 * @returns {Array} an array of polygons, each polygon contains an array of points
 * @alias module:modeling/geometry/geom3.toPolygons
 *
 * @example
 * let sharedpolygons = toPolygons(geometry)
 */
const toPolygons = function (geometry) {
  return applyTransforms(geometry).polygons
}

module.exports = toPolygons
