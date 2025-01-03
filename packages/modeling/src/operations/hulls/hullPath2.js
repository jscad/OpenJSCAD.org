import * as path2 from '../../geometries/path2/index.js'

import { hullPoints2 } from './hullPoints2.js'
import { toUniquePoints } from './toUniquePoints.js'

/*
 * Create a convex hull of the given path2 geometries.
 *
 * NOTE: The given geometries must be valid path2 geometry.
 *
 * @param {Path2[]} geometries - a flat list of path2 geometries
 * @returns {Path2} new geometry
 */
export const hullPath2 = (geometries) => {
  // extract the unique points from the geometries
  const unique = toUniquePoints(geometries)

  const hullPoints = hullPoints2(unique)

  // assemble a new geometry from the list of points
  return path2.fromPoints({ closed: true }, hullPoints)
}
