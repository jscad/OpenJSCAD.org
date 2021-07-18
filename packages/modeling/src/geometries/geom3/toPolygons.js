const applyTransforms = require('./applyTransforms')

const cache = new WeakMap()

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
const toPolygons = (geometry) => {
  let polygons = cache.get(geometry)
  if (polygons) return polygons

  polygons = applyTransforms(geometry).polygons
  cache.set(geometry, polygons)
  return polygons
}

module.exports = toPolygons
