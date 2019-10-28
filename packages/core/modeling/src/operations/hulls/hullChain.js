const flatten = require('../../utils/flatten')

const union = require('../booleans/union')

const hull = require('./hull')

/**
 * Create a chain of hulled geometries from the given gemetries.
 * Essentially hull A+B, B+C, C+D, etc., then union the results.
 * @param {...geometries} geometries - list of geometries from which to create hulls
 * @returns {geometry} new geometry
 *
 * @example:
 * let newshape = hullChain(rectangle({center: [-5,-5]}), circle({center: [0,0]}), rectangle({center: [5,5]}))
 */
const hullChain = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length < 2) throw new Error('wrong number of arguments')

  let hulls = []
  for (let i = 1; i < geometries.length; i++) {
    hulls.push(hull(geometries[i - 1], geometries[i]))
  }
  return union(hulls)
}

module.exports = hullChain
