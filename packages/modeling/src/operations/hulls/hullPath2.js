import { flatten } from '../../utils/flatten.js'

import * as path2 from '../../geometries/path2/index.js'

import { hullPoints2 } from './hullPoints2.js'
import { toUniquePoints } from './toUniquePoints.js'

/*
 * Create a convex hull of the given geometries (path2).
 * @param {...Path2} geometries - list of path2 geometries
 * @returns {Path2} new geometry
 */
export const hullPath2 = (...geometries) => {
  geometries = flatten(geometries)

  // extract the unique points from the geometries
  const unique = toUniquePoints(geometries)

  const hullPoints = hullPoints2(unique)

  // assemble a new geometry from the list of points
  return path2.fromPoints({ closed: true }, hullPoints)
}
