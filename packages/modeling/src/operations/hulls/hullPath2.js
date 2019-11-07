const flatten = require('../../utils/flatten')

const { vec2 } = require('../../math')

const { path2 } = require('../../geometry')

const hullPoints2 = require('./hullPoints2')

/*
 * Create a convex hull of the given geometries (path2).
 * @param {...geometries} geometries - list of path2 geometries
 * @returns {path2} new geometry
 */
const hullPath2 = (...geometries) => {
  geometries = flatten(geometries)

  // extract the unique points from the geometries
  let uniquepoints = []
  geometries.forEach((geometry) => {
    let points = path2.toPoints(geometry)
    points.forEach((point) => {
      let index = uniquepoints.findIndex((unique) => vec2.equals(unique, point))
      if (index < 0) uniquepoints.push(point)
    })
  })

  let hullpoints = hullPoints2(uniquepoints)

  // assemble a new geometry from the list of points
  return path2.fromPoints({closed: true}, hullpoints)
}

module.exports = hullPath2
