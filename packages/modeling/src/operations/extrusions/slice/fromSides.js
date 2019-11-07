const vec3 = require('../../../math/vec3')

const create = require('./create')

/**
 * Create a slice from the given sides (see geom2).
 *
 * @param {sides[]} sides - list of 2D sides
 *
 * @example
 * const myshape = circle({radius: 10})
 * const slice = fromSides(geom2.toSides(myshape))
 */
const fromSides = (sides) => {
  if (!Array.isArray(sides)) throw new Error('the given sides must be an array')

  // create a list of edges from the sides
  let edges = []
  sides.forEach((side) => {
    edges.push([vec3.fromVec2(side[0]), vec3.fromVec2(side[1])])
  })
  return create(edges)
}

module.exports = fromSides
