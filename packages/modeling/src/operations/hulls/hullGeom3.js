import * as geom3 from '../../geometries/geom3/index.js'

import { hullPoints3 } from './hullPoints3.js'
import { toUniquePoints } from './toUniquePoints.js'

/*
 * Create a convex hull of the given geom3 geometries.
 *
 * NOTE: The given geometries must be valid geom3 geometries.
 *
 * @param {Geom3[]} geometries - a flat list of 3D geometries
 * @returns {Geom3} new geometry
 */
export const hullGeom3 = (geometries) => {
  // extract the unique vertices from the geometries
  const unique = toUniquePoints(geometries)

  if (unique.length === 0) return geom3.create()

  return geom3.create(hullPoints3(unique))
}
