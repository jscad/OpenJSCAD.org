const flatten = require('../../utils/flatten')

const { EPS } = require('../../math/constants')

const { geom2, geom3, path2, poly3 } = require('../../geometry')

const measureBounds = require('../measurements/measureBounds')

/*
 * Measure the epsilon of the given (path2) geometry.
 * @return {Float} the epsilon (precision) of the geometry
 */
const measureEpsilonOfPath2 = (geometry) => {
  let bounds = measureBounds(geometry)
  let x = bounds[1][0] - bounds[0][0]
  let y = bounds[1][1] - bounds[0][1]

  let epsilon = (x + y) / 2 * EPS
  return epsilon
}

/*
 * Measure the epsilon of the given (geom2) geometry.
 * @return {Float} the epsilon (precision) of the geometry
 */
const measureEpsilonOfGeom2 = (geometry) => {
  let bounds = measureBounds(geometry)
  let x = bounds[1][0] - bounds[0][0]
  let y = bounds[1][1] - bounds[0][1]

  let epsilon = (x + y) / 2 * EPS
  return epsilon
}

/*
 * Measure the epsilon of the given (geom3) geometry.
 * @return {Float} the epsilon (precision) of the geometry
 */
const measureEpsilonOfGeom3 = (geometry) => {
  let bounds = measureBounds(geometry)
  let x = bounds[1][0] - bounds[0][0]
  let y = bounds[1][1] - bounds[0][1]
  let z = bounds[1][2] - bounds[0][2]

  let epsilon = (x + y + z) / 3 * EPS
  return epsilon
}

/*
 * Measure the epsilon of the given geometry(s).
 * Epsilon values are used in various functions to determin minimum distances between points, planes, etc.
 * @param {...Objects} geometries - the geometry(s) to measure
 * @return {Float|Array} the epsilon of each geometry
 *
 * @example
 * let epsilon = measureEpsilon(sphere())
 */
const measureEpsilon = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry) => {
    if (path2.isA(geometry)) return measureEpsilonOfPath2(geometry)
    if (geom2.isA(geometry)) return measureEpsilonOfGeom2(geometry)
    if (geom3.isA(geometry)) return measureEpsilonOfGeom3(geometry)
    return EPS
  })
  return results.length === 1 ? results[0] : results
}

module.exports = measureEpsilon
