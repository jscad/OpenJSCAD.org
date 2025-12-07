import * as poly3 from '../poly3/index.js'

import { toPolygons } from './toPolygons.js'

/**
 * Return the given geometry as a list of points, after applying transforms.
 *
 * The returned array should not be modified as the points are shared with the geometry.
 * @param {Geom3} geometry - the geometry
 * @return {Array} list of points, where each sub-array represents a polygon
 * @alias module:modeling/geometries/geom3.toVertices
 */
export const toVertices = (geometry) => {
  const polygons = toPolygons(geometry)
  return polygons.map((polygon) => poly3.toVertices(polygon))
}
