import applyTransforms from './applyTransforms.js'

/**
 * Produces an array of polygons from the given geometry, after applying transforms.
 * The returned array should not be modified as the polygons are shared with the geometry.
 * @param {geom3} geometry - the geometry
 * @returns {Array} an array of polygons
 * @alias module:modeling/geometries/geom3.toPolygons
 *
 * @example
 * let sharedpolygons = toPolygons(geometry)
 */
export const toPolygons = (geometry) => applyTransforms(geometry).polygons

export default toPolygons
