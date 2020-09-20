const flatten = require('../utils/flatten')
const measureAggregateBoundingBox = require('./measureAggregateBoundingBox')
const calculateEpsilonFromBounds = require('./calculateEpsilonFromBounds')
const { geom2, geom3, path2 } = require('../geometries')

/**
 * Measure the aggregated Epsilon for the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Number} the aggregated Epsilon for the whole group of geometries
 * @alias module:modeling/measurements.measureAggregateEpsilon
 *
 * @example
 * let groupEpsilon = measureAggregateEpsilon(sphere(),cube())
 */
const measureAggregateEpsilon = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('measureAggregateEpsilon: no geometries supplied')
  const bounds = measureAggregateBoundingBox(geometries)

  let dimensions = 0
  dimensions = geometries.reduce((dimensions, geometry) => {
    if (path2.isA(geometry) || geom2.isA(geometry)) return Math.max(dimensions, 2)
    if (geom3.isA(geometry)) return Math.max(dimensions, 3)
    return 0
  }, dimensions)
  return calculateEpsilonFromBounds(bounds, dimensions)
}

module.exports = measureAggregateEpsilon
