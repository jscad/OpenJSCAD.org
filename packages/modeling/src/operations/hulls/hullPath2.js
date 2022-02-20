const flatten = require('../../utils/flatten')

const vec2 = require('../../maths/vec2')

const path2 = require('../../geometries/path2')

const hullPoints2 = require('./hullPoints2')

/*
 * Create a convex hull of the given geometries (path2).
 * @param {...geometries} geometries - list of path2 geometries
 * @returns {path2} new geometry
 */
const hullPath2 = (...geometries) => {
  geometries = flatten(geometries)

  // extract the unique points from the geometries
  const uniquepoints = []
  const found = {}
  geometries.forEach((geometry) => {
    const points = path2.toPoints(geometry)
    points.forEach((point) => {
      const key = point.toString()
      if (!found[key]) {
        uniquepoints.push(point)
        found[key] = true
      }
    })
  })

  const hullpoints = hullPoints2(uniquepoints)

  // assemble a new geometry from the list of points
  return path2.fromPoints({ closed: true }, hullpoints)
}

module.exports = hullPath2
