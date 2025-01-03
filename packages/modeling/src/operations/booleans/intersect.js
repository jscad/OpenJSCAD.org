import { areAllShapesTheSameType } from '../../utils/areAllShapesTheSameType.js'
import { coalesce } from '../../utils/coalesce.js'

import * as geom2 from '../../geometries/geom2/index.js'
import * as geom3 from '../../geometries/geom3/index.js'

import { intersectGeom2 } from './intersectGeom2.js'
import { intersectGeom3 } from './intersectGeom3.js'

/**
 * Return a new geometry representing space in both the first geometry and
 * all subsequent geometries.
 * The given geometries should be of the same type, either geom2 or geom3.
 *
 * @param {...Object} geometries - list of geometries
 * @returns {Geom2|Geom3} a new geometry
 * @alias module:modeling/booleans.intersect
 *
 * @example
 * let myshape = intersect(cube({size: 5}), cube({size: 5, center: [3,3,3]}))
 *
 * @example
 * +-------+
 * |       |
 * |   A   |
 * |    +--+----+   =   +--+
 * +----+--+    |       +--+
 *      |   B   |
 *      |       |
 *      +-------+
 */
export const intersect = (...geometries) => {
  geometries = coalesce(geometries)

  if (geometries.length === 0) return undefined
  if (!areAllShapesTheSameType(geometries)) {
    throw new Error('intersect arguments must be the same geometry type')
  }

  const geometry = geometries[0]
  // if (path.isA(geometry)) return intersectPath(matrix, geometries)
  if (geom2.isA(geometry)) return intersectGeom2(geometries)
  if (geom3.isA(geometry)) return intersectGeom3(geometries)
  throw new Error('intersect unsupported geometry type')
}
