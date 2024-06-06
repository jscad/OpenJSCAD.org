import { areAllShapesTheSameType } from '../../utils/areAllShapesTheSameType.js'
import { coalesce } from '../../utils/coalesce.js'

import * as geom2 from '../../geometries/geom2/index.js'
import * as geom3 from '../../geometries/geom3/index.js'
import * as path2 from '../../geometries/path2/index.js'

import { hullPath2 } from './hullPath2.js'
import { hullGeom2 } from './hullGeom2.js'
import { hullGeom3 } from './hullGeom3.js'

/**
 * Create a convex hull of the given geometries.
 * The given geometries should be of the same type, either geom2 or geom3 or path2.
 * @param {...Object} geometries - list of geometries from which to create a hull
 * @returns {Geom2|Geom3|Path2} new geometry
 * @alias module:modeling/hulls.hull
 *
 * @example
 * let myshape = hull(rectangle({center: [-5,-5]}), ellipse({center: [5,5]}))
 *
 * @example
 * +-------+           +-------+
 * |       |           |        \
 * |   A   |           |         \
 * |       |           |          \
 * +-------+           +           \
 *                  =   \           \
 *       +-------+       \           +
 *       |       |        \          |
 *       |   B   |         \         |
 *       |       |          \        |
 *       +-------+           +-------+
 */
export const hull = (...geometries) => {
  geometries = coalesce(geometries)

  if (geometries.length === 0) return undefined

  if (!areAllShapesTheSameType(geometries)) {
    throw new Error('only hulls of the same type are supported')
  }

  const geometry = geometries[0]
  if (path2.isA(geometry)) return hullPath2(geometries)
  if (geom2.isA(geometry)) return hullGeom2(geometries)
  if (geom3.isA(geometry)) return hullGeom3(geometries)

  // FIXME should this throw an error for unknown geometries?
  return geometry
}
