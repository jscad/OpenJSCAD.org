const flatten = require('../../utils/flatten')

const geom3 = require('../../geometries/geom3')

const toUniquePoints = require('./toUniquePoints')
const hullPoints3 = require('./hullPoints3')

/*
 * Create a convex hull of the given geom3 geometries.
 *
 * NOTE: The given geometries must be valid geom3 geometries.
 *
 * @param {...geometries} geometries - list of geom3 geometries
 * @returns {geom3} new geometry
 */
const hullGeom3 = (...geometries) => {
  geometries = flatten(geometries)

  // extract the unique vertices from the geometries
  const unique = toUniquePoints(geometries)

  if (unique.length === 0) return geom3.create()

  return geom3.create(hullPoints3(unique))
}

module.exports = hullGeom3
