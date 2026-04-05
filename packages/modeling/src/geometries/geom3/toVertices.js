import * as poly3 from '../poly3/index.js'

import { toPolygons } from './toPolygons.js'

/**
 * Return the given geometry as a list of vertices, after applying transforms.
 *
 * The returned array should not be modified as the vertices are shared with the geometry.
 *
 * @param {Geom3} geometry - the geometry
 * @return {Array} list of vertices, where each sub-array represents a polygon
 * @alias module:modeling/geom3.toVertices
 *
 * @example
 * let sharedVertices = geom3.toVertices(geometry)
 */
export const toVertices = (geometry) => {
  const polygons = toPolygons(geometry)
  return polygons.map((polygon) => poly3.toVertices(polygon))
}
