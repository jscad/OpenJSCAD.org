const vec2 = require('../../math/vec2')

const create = require('./create')
const toSides = require('./toSides')

/**
 * Reverses the given geometry so that the sides are flipped and in the opposite order.
 * This swaps the left (interior) and right (exterior) edges.
 * @param {geom2} geometry - the geometry to reverse
 * @returns {geom2} the new reversed geometry
 * @example
 * let newgeometry = reverse(geometry)
 */
const reverse = (geometry) => {
  let oldsides = toSides(geometry)

  let newsides = oldsides.map((side) => {
    return [side[1], side[0]]
  })
  newsides.reverse() // is this required?
  return create(newsides)
}

module.exports = reverse
