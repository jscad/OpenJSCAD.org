const flatten = require('../../utils/flatten')

const path2 = require('../../geometries/path2')

const hullPoints2 = require('./hullPoints2')
const toUniquePoints = require('./toUniquePoints')

/*
 * Create a convex hull of the given geometries (path2).
 * @param {...geometries} geometries - list of path2 geometries
 * @returns {path2} new geometry
 */
const hullPath2 = (...geometries) => {
  geometries = flatten(geometries)

  // extract the unique points from the geometries
  const unique = toUniquePoints(geometries)

  const hullPoints = hullPoints2(unique)

  // assemble a new geometry from the list of points
  return path2.fromPoints({ closed: true }, hullPoints)
}

module.exports = hullPath2
