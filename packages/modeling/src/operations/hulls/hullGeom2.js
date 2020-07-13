const flatten = require('../../utils/flatten')

const geom2 = require('../../geometries/geom2')

const hullPoints2 = require('./hullPoints2')

/*
 * Create a convex hull of the given geom2 geometries.
 * @param {...geometries} geometries - list of geom2 geometries
 * @returns {geom2} new geometry
 */
const hullGeom2 = (...geometries) => {
  geometries = flatten(geometries)

  // extract the unique points from the geometries
  const uniquepoints = []
  const found = new Map()
  for (let g = 0; g < geometries.length; g++) {
    const sides = geom2.toSides(geometries[g])
    for (let s = 0; s < sides.length; s++) {
      const side = sides[s]
      const point = side[0]
      const id = `${point[0]},${point[1]}`
      if (found.has(id)) continue
      uniquepoints.push(point)
      found.set(id, true)
    }
  }
  found.clear()

  const hullpoints = hullPoints2(uniquepoints)

  // NOTE: more then three points are required to create a new geometry
  if (hullpoints.length < 3) return geom2.create()

  // assemble a new geometry from the list of points
  return geom2.fromPoints(hullpoints)
}

module.exports = hullGeom2
