const flatten = require('../../utils/flatten')

const geom3 = require('../../geometries/geom3')
const poly3 = require('../../geometries/poly3')

const quickhull = require('./quickhull')
const toUniquePoints = require('./toUniquePoints')

/*
 * Create a convex hull of the given geometries (geom3).
 * @param {...geometries} geometries - list of geom3 geometries
 * @returns {geom3} new geometry
 */
const hullGeom3 = (...geometries) => {
  geometries = flatten(geometries)

  if (geometries.length === 1) return geometries[0]

  // extract the unique vertices from the geometries
  const unique = toUniquePoints(geometries)

  const faces = quickhull(unique, { skipTriangulation: true })

  const polygons = faces.map((face) => {
    const vertices = face.map((index) => unique[index])
    return poly3.create(vertices)
  })

  return geom3.create(polygons)
}

module.exports = hullGeom3
