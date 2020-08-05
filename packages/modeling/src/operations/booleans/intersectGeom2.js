const flatten = require('../../utils/flatten')

const geom3 = require('../../geometries/geom3')

const measureEpsilon = require('../../measurements/measureEpsilon')

const fromFakePolygons = require('./fromFakePolygons')
const to3DWalls = require('./to3DWalls')
const intersectGeom3 = require('./intersectGeom3')

/*
 * Return a new 2D geometry representing space in both the first geometry and
 * in the subsequent geometries. None of the given geometries are modified.
 * @param {...geom2} geometries - list of 2D geometries
 * @returns {geom2} new 2D geometry
 */
const intersect = (...geometries) => {
  geometries = flatten(geometries)
  const newgeometries = geometries.map((geometry) => to3DWalls({ z0: -1, z1: 1 }, geometry))

  const newgeom3 = intersectGeom3(newgeometries)
  const epsilon = measureEpsilon(newgeom3)

  return fromFakePolygons(epsilon, geom3.toPolygons(newgeom3))
}

module.exports = intersect
