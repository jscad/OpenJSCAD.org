import { areAllShapesTheSameType } from '../../utils/areAllShapesTheSameType.js'
import { coalesce } from '../../utils/coalesce.js'

import * as geom2 from '../../geometries/geom2/index.js'
import * as geom3 from '../../geometries/geom3/index.js'

import { unionGeom2 } from './unionGeom2.js'
import { unionGeom3 } from './unionGeom3.js'

/**
 * Return a new geometry representing the total space in the given geometries.
 * The given geometries should be of the same type, either geom2 or geom3.
 *
 * @param {...Object} geometries - list of geometries
 * @returns {Geom2|Geom3} a new geometry
 * @alias module:modeling/booleans.union
 *
 * @example
 * let myshape = union(cube({size: [5,5,5]}), cube({size: [5,5,5], center: [5,5,5]}))
 *
 * @example
 * +-------+            +-------+
 * |       |            |       |
 * |   A   |            |       |
 * |    +--+----+   =   |       +----+
 * +----+--+    |       +----+       |
 *      |   B   |            |       |
 *      |       |            |       |
 *      +-------+            +-------+
 */
export const union = (...geometries) => {
  geometries = coalesce(geometries)

  if (geometries.length === 0) return undefined
  if (!areAllShapesTheSameType(geometries)) {
    throw new Error('union arguments must be the same geometry type')
  }

  const geometry = geometries[0]
  // if (path.isA(geometry)) return unionPath(matrix, geometries)
  if (geom2.isA(geometry)) return unionGeom2(geometries)
  if (geom3.isA(geometry)) return unionGeom3(geometries)
  throw new Error('union unsupported geometry type')
}
