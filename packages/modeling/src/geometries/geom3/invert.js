import * as poly3 from '../poly3/index.js'

import { create } from './create.js'
import { toPolygons } from './toPolygons.js'

/**
 * Invert the given geometry, transposing solid and empty space.
 * @param {geom3} geometry - the geometry to invert
 * @return {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.invert
 */
export const invert = (geometry) => {
  const polygons = toPolygons(geometry)
  const newpolygons = polygons.map((polygon) => poly3.invert(polygon))
  return create(newpolygons)
}
