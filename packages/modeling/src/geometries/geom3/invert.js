import * as poly3 from '../poly3/index.js'

import { toPolygons } from './toPolygons.js'

/**
 * Invert the given geometry, transposing solid and empty space.
 *
 * @param {Geom3} geometry - the geometry to invert
 * @returns {Geom3} a new geometry
 * @alias module:modeling/geom3.invert
 *
 * @example
 * let inverted = geom3.invert(geometry)
 */
export const invert = (geometry) => {
  let polygons = toPolygons(geometry)
  polygons = polygons.map((polygon) => poly3.invert(polygon))
  // use Object.assign in order to assign EXTRA attributes like color, name, etc
  return Object.assign({}, geometry, { polygons })
}
