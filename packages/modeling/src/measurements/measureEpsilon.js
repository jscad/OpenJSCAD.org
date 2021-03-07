const flatten = require('../utils/flatten')
const calculateEpsilonFromBounds = require('./calculateEpsilonFromBounds')
const { geom2, geom3, path2 } = require('../geometries')
const measureBoundingBox = require('./measureBoundingBox')

/*
 * Measure the epsilon of the given (path2) geometry.
 * @return {Number} the epsilon (precision) of the geometry
 */
const measureEpsilonOfPath2 = (geometry) => {
  if (geometry.epsilon) return geometry.epsilon

  geometry.epsilon = calculateEpsilonFromBounds(measureBoundingBox(geometry), 2)
  return geometry.epsilon
}

/*
 * Measure the epsilon of the given (geom2) geometry.
 * @return {Number} the epsilon (precision) of the geometry
 */
const measureEpsilonOfGeom2 = (geometry) => {
  if (geometry.epsilon) return geometry.epsilon

  geometry.epsilon = calculateEpsilonFromBounds(measureBoundingBox(geometry), 2)
  return geometry.epsilon
}

/*
 * Measure the epsilon of the given (geom3) geometry.
 * @return {Float} the epsilon (precision) of the geometry
 */
const measureEpsilonOfGeom3 = (geometry) => {
  if (geometry.epsilon) return geometry.epsilon

  geometry.epsilon = calculateEpsilonFromBounds(measureBoundingBox(geometry), 3)
  return geometry.epsilon
}

/**
 * Measure the epsilon of the given geometries.
 * Epsilon values are used in various functions to determine minimum distances between points, planes, etc.
 * @param {...Object} geometries - the geometries to measure
 * @return {Number|Array} the epsilon for each geometry
 * @alias module:modeling/measurements.measureEpsilon
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
    return 0
  })
  return results.length === 1 ? results[0] : results
}

module.exports = measureEpsilon
