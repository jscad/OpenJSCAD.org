import { clone } from './clone.js'

/**
 * Reverses the given geometry so that the outline points are flipped in the opposite order.
 * This swaps the left (interior) and right (exterior) edges.
 * @param {Geom2} geometry - the geometry to reverse
 * @returns {Geom2} the new reversed geometry
 * @alias module:modeling/geometries/geom2.reverse
 *
 * @example
 * let newGeometry = reverse(geometry)
 */
export const reverse = (geometry) => {
  const reversed = clone(geometry)
  reversed.outlines = reversed.outlines.map((outline) => outline.slice().reverse())
  return reversed
}
