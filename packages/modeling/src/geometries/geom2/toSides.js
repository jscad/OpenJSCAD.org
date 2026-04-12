import { toOutlines } from './toOutlines.js'

/**
 * Produces an array of sides from the given geometry.
 *
 * NOTE: The sides returned do NOT define an order. Use toOutlines() for ordered points.
 *
 * @param {Geom2} geometry - the geometry
 * @returns {Array} an array of sides
 * @alias module:modeling/geom2.toSides
 *
 * @example
 * let sharedSides = geom2.toSides(geometry)
 */
export const toSides = (geometry) => {
  const sides = []
  toOutlines(geometry).forEach((outline) => {
    outline.forEach((point, i) => {
      const j = (i + 1) % outline.length
      sides.push([point, outline[j]])
    })
  })
  return sides
}
