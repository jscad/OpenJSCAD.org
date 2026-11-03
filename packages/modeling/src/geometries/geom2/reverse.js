import { toOutlines } from './toOutlines.js'

/**
 * Reverses the given geometry so that the outline points are flipped in the opposite order.
 *
 * This swaps the left (interior) and right (exterior) edges.
 *
 * @param {Geom2} geometry - the geometry to reverse
 * @returns {Geom2} the new reversed geometry
 * @alias module:modeling/geom2.reverse
 *
 * @example
 * let newGeometry = geom2.reverse(geometry)
 */
export const reverse = (geometry) => {
  const outlines = toOutlines(geometry).map((outline) => outline.slice().reverse())
  // use Object.assign in order to assign EXTRA attributes like color, name, etc
  const reversed = Object.assign({}, geometry, { outlines })
  return reversed
}
