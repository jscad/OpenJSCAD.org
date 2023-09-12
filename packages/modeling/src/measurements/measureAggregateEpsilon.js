import { flatten } from '../utils/flatten.js'

import * as geom2 from '../geometries/geom2/index.js'
import * as geom3 from '../geometries/geom3/index.js'
import * as path2 from '../geometries/path2/index.js'

import { measureAggregateBoundingBox } from './measureAggregateBoundingBox.js'
import { calculateEpsilonFromBounds } from './calculateEpsilonFromBounds.js'

/**
 * Measure the aggregated Epsilon for the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {number} the aggregated Epsilon for the whole group of geometries
 * @alias module:modeling/measurements.measureAggregateEpsilon
 *
 * @example
 * let groupEpsilon = measureAggregateEpsilon(sphere(),cube())
 */
export const measureAggregateEpsilon = (...geometries) => {
  geometries = flatten(geometries)
  const bounds = measureAggregateBoundingBox(geometries)

  let dimensions = 0
  dimensions = geometries.reduce((dimensions, geometry) => {
    if (path2.isA(geometry) || geom2.isA(geometry)) return Math.max(dimensions, 2)
    if (geom3.isA(geometry)) return Math.max(dimensions, 3)
    return 0
  }, dimensions)
  return calculateEpsilonFromBounds(bounds, dimensions)
}
