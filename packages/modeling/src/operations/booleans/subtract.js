import { areAllShapesTheSameType } from '../../utils/areAllShapesTheSameType.js'
import { coalesce } from '../../utils/coalesce.js'

import * as geom2 from '../../geometries/geom2/index.js'
import * as geom3 from '../../geometries/geom3/index.js'

import { subtractGeom2 } from './subtractGeom2.js'
import { subtractGeom3 } from './subtractGeom3.js'

/**
 * Return a new geometry representing space in the first geometry but
 * not in all subsequent geometries.
 * The given geometries should be of the same type, either geom2 or geom3.
 *
 * @param {...Object} geometries - list of geometries
 * @returns {Geom2|Geom3} a new geometry
 * @alias module:modeling/booleans.subtract
 *
 * @example
 * let myshape = subtract(cuboid({size: 5}), cuboid({size: 5, center: [3,3,3]}))
 *
 * @example
 * +-------+            +-------+
 * |       |            |       |
 * |   A   |            |       |
 * |    +--+----+   =   |    +--+
 * +----+--+    |       +----+
 *      |   B   |
 *      |       |
 *      +-------+
 */
export const subtract = (...geometries) => {
  geometries = coalesce(geometries)

  if (geometries.length === 0) return undefined
  if (!areAllShapesTheSameType(geometries)) {
    throw new Error('subtract arguments must be the same geometry type')
  }

  const geometry = geometries[0]
  // if (path.isA(geometry)) return subtractPath(matrix, geometries)
  if (geom2.isA(geometry)) return subtractGeom2(geometries)
  if (geom3.isA(geometry)) return subtractGeom3(geometries)
  throw new Error('subtract unsupported geometry type')
}
