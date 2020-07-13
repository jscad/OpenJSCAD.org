const create = require('./create')
const toSides = require('./toSides')

/**
 * Reverses the given geometry so that the sides are flipped in the opposite order.
 * This swaps the left (interior) and right (exterior) edges.
 * @param {geom2} geometry - the geometry to reverse
 * @returns {geom2} the new reversed geometry
 * @alias module:modeling/geometries/geom2.reverse
 *
 * @example
 * let newgeometry = reverse(geometry)
 */
const reverse = (geometry) => {
  const oldsides = toSides(geometry)

  const newsides = oldsides.map((side) => [side[1], side[0]])
  newsides.reverse() // is this required?
  return create(newsides)
}

module.exports = reverse
