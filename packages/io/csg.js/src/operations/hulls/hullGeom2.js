const flatten = require('../../utils/flatten')

const { vec2 } = require('../../math')

const { geom2 } = require('../../geometry')

const hullPoints2 = require('./hullPoints2')

/*
 * Create a convex hull of the given geom2 geometries.
 * @param {...geometries} geometries - list of geom2 geometries
 * @returns {geom2} new geometry
 */
const hullGeom2 = (...geometries) => {
  geometries = flatten(geometries)

  // extract the unique points from the geometries
  let uniquepoints = []
  geometries.forEach((geometry) => {
    let sides = geom2.toSides(geometry)
    sides.forEach((side) => {
      let index = uniquepoints.findIndex((unique) => vec2.equals(unique, side[0]))
      if (index < 0) uniquepoints.push(side[0])
    })
  })

  let hullpoints = hullPoints2(uniquepoints)

  // NOTE: more then three points are required to create a new geometry
  if (hullpoints.length < 3) return geom2.create()

  // assemble a new geometry from the list of points
  return geom2.fromPoints(hullpoints)
}

module.exports = hullGeom2
