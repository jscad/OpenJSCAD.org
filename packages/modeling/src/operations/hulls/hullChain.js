import { flatten } from '../../utils/index.js'

import { union } from '../booleans/index.js'

import { hull } from './hull.js'

/**
 * Create a chain of hulled geometries from the given geometries.
 * Essentially hull A+B, B+C, C+D, etc., then union the results.
 * The given geometries should be of the same type, either geom2 or geom3 or path2.
 *
 * @param {...Objects} geometries - list of geometries from which to create a hull
 * @returns {geom2|geom3} new geometry
 * @alias module:modeling/hulls.hullChain
 *
 * @example
 * let newShape = hullChain(rectangle({center: [-5,-5]}), circle({center: [0,0]}), rectangle({center: [5,5]}))
 *
 * @example
 * +-------+   +-------+     +-------+   +------+
 * |       |   |       |     |        \ /       |
 * |   A   |   |   C   |     |         |        |
 * |       |   |       |     |                  |
 * +-------+   +-------+     +                  +
 *                       =   \                 /
 *       +-------+            \               /
 *       |       |             \             /
 *       |   B   |              \           /
 *       |       |               \         /
 *       +-------+                +-------+
 */
export const hullChain = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length < 2) throw new Error('wrong number of arguments')

  const hulls = []
  for (let i = 1; i < geometries.length; i++) {
    hulls.push(hull(geometries[i - 1], geometries[i]))
  }
  return union(hulls)
}
