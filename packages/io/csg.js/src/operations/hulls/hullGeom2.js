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
  let found = new Map()
  for (let g = 0; g < geometries.length; g++) {
    let sides = geom2.toSides(geometries[g])
     for (let s = 0; s < sides.length; s++) {
       let side = sides[s]
       let point = side[0]
       let id = `${point[0]},${point[1]}`
       if (found.has(id)) continue
       uniquepoints.push(point)
       found.set(id, true)
     }
  }
  found.clear()

  let hullpoints = hullPoints2(uniquepoints)

  // NOTE: more then three points are required to create a new geometry
  if (hullpoints.length < 3) return geom2.create()

  // assemble a new geometry from the list of points
  return geom2.fromPoints(hullpoints)
}

module.exports = hullGeom2
