const toSides = require('./toSides')

const cache = new WeakMap()

/**
 * Produces an array of points from the given geometry.
 * The returned array should not be modified as the points are shared with the geometry.
 * NOTE: The points returned do NOT define an order. Use toOutlines() for ordered points.
 * @param {geom2} geometry - the geometry
 * @returns {Array} an array of points
 * @alias module:modeling/geometries/geom2.toPoints
 *
 * @example
 * let sharedpoints = toPoints(geometry)
 */
const toPoints = (geometry) => {
  let points = cache.get(geometry)
  if (points) return points

  const sides = toSides(geometry)
  points = sides.map((side) => side[0])
  // due to the logic of fromPoints()
  // move the first point to the last
  if (points.length > 0) {
    points.push(points.shift())
  }
  cache.set(geometry, points)
  return points
}

module.exports = toPoints
