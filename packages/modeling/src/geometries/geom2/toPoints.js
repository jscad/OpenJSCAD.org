import { toOutlines } from './toOutlines.js'

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
export const toPoints = (geometry) => {
  const points = []
  toOutlines(geometry).forEach((outline) => {
    outline.forEach((point) => {
      points.push(point)
    })
  })
  return points
}
