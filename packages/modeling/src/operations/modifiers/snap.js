const flatten = require('../../utils/flatten')

const vec2 = require('../../maths/vec2')

const geom2 = require('../../geometries/geom2')
const geom3 = require('../../geometries/geom3')
const path2 = require('../../geometries/path2')

const measureEpsilon = require('../../measurements/measureEpsilon')

const snapPolygons = require('./snapPolygons')

const snapPath2 = (geometry) => {
  const epsilon = measureEpsilon(geometry)
  const points = path2.toPoints(geometry)
  const newpoints = points.map((point) => vec2.snap(vec2.create(), point, epsilon))
  // snap can produce duplicate points, remove those
  return path2.create(newpoints)
}

const snapGeom2 = (geometry) => {
  const epsilon = measureEpsilon(geometry)
  const sides = geom2.toSides(geometry)
  let newsides = sides.map((side) => [vec2.snap(vec2.create(), side[0], epsilon), vec2.snap(vec2.create(), side[1], epsilon)])
  // snap can produce sides with zero (0) length, remove those
  newsides = newsides.filter((side) => !vec2.equals(side[0], side[1]))
  return geom2.create(newsides)
}

const snapGeom3 = (geometry) => {
  const epsilon = measureEpsilon(geometry)
  const polygons = geom3.toPolygons(geometry)
  const newpolygons = snapPolygons(epsilon, polygons)
  return geom3.create(newpolygons)
}

/**
 * Snap the given geometries to the overall precision (epsilon) of the geometry.
 * @see measurements.measureEpsilon()
 * @param {...Object} geometries - the geometries to snap
 * @return {Object|Array} the snapped geometry, or a list of snapped geometries
 * @alias module:modeling/modifiers.snap
 */
const snap = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry) => {
    if (path2.isA(geometry)) return snapPath2(geometry)
    if (geom2.isA(geometry)) return snapGeom2(geometry)
    if (geom3.isA(geometry)) return snapGeom3(geometry)
    return geometry
  })
  return results.length === 1 ? results[0] : results
}

module.exports = snap
