const flatten = require('../../utils/flatten')

const geom2 = require('../../geometries/geom2')

const hullPoints2 = require('./hullPoints2')
const toUniquePoints = require('./toUniquePoints')

/*
 * Create a convex hull of the given geom2 geometries.
 *
 * NOTE: The given geometries must be valid geom2 geometries.
 *
 * @param {...geometries} geometries - list of geom2 geometries
 * @returns {geom2} new geometry
 */
const hullGeom2 = (...geometries) => {
  geometries = flatten(geometries)

  // extract the unique points from the geometries
  const unique = toUniquePoints(geometries)

  const hullPoints = hullPoints2(unique)

  // NOTE: more than three points are required to create a new geometry
  if (hullPoints.length < 3) return geom2.create()

  // assemble a new geometry from the list of points
  return geom2.fromPoints(hullPoints)
}

module.exports = hullGeom2
