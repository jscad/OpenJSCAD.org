import * as poly3 from '../poly3/index.js'

import { toPolygons } from './toPolygons.js'

/**
 * Create a string representing the contents of the given geometry.
 * @param {Geom3} geometry - the geometry
 * @returns {string} a representative string
 * @alias module:modeling/geometries/geom3.toString
 *
 * @example
 * console.out(toString(geometry))
 */
export const toString = (geometry) => {
  const polygons = toPolygons(geometry)
  let result = 'geom3 (' + polygons.length + ' polygons):\n'
  polygons.forEach((polygon) => {
    result += '  ' + poly3.toString(polygon) + '\n'
  })
  return result
}
