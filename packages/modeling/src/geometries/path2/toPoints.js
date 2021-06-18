const applyTransforms = require('./applyTransforms')

const cache = new WeakMap()

/**
 * Produces an array of points from the given geometry.
 * The returned array should not be modified as the data is shared with the geometry.
 * @param {path2} geometry - the geometry
 * @returns {Array} an array of points
 * @alias module:modeling/geometries/path2.toPoints
 *
 * @example
 * let sharedpoints = toPoints(geometry)
 */
const toPoints = (geometry) => {
  let points = cache.get(geometry)
  if (points) return points

  points = applyTransforms(geometry).points
  cache.set(geometry, points)
  return points
}

module.exports = toPoints
