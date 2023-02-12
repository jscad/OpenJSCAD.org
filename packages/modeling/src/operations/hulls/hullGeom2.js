import flatten from '../../utils/flatten.js'

import * as geom2 from '../../geometries/geom2/index.js'

import hullPoints2 from './hullPoints2.js'
import toUniquePoints from './toUniquePoints.js'

/*
 * Create a convex hull of the given geom2 geometries.
 * @param {...geometries} geometries - list of geom2 geometries
 * @returns {geom2} new geometry
 */
export const hullGeom2 = (...geometries) => {
  geometries = flatten(geometries)

  // extract the unique points from the geometries
  const unique = toUniquePoints(geometries)

  const hullPoints = hullPoints2(unique)

  // NOTE: more than three points are required to create a new geometry
  if (hullPoints.length < 3) return geom2.create()

  // assemble a new geometry from the list of points
  return geom2.create([hullPoints])
}
