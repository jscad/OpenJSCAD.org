import { flatten } from '../utils/flatten.js'

import * as geom2 from '../geometries/geom2/index.js'
import * as geom3 from '../geometries/geom3/index.js'
import * as path2 from '../geometries/path2/index.js'
import * as slice from '../geometries/slice/index.js'

import { calculateEpsilonFromBounds } from './calculateEpsilonFromBounds.js'
import { measureBoundingBox } from './measureBoundingBox.js'

/**
 * Measure the epsilon of the given geometries.
 * Epsilon values are used in various functions to determine minimum distances between vertices, planes, etc.
 * @param {...Object} geometries - the geometries to measure
 * @return {number|Array} the epsilon, or a list of epsilons for each geometry
 * @alias module:modeling/measurements.measureEpsilon
 *
 * @example
 * let epsilon = measureEpsilon(sphere())
 */
export const measureEpsilon = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry) => {
    if (path2.isA(geometry)) return calculateEpsilonFromBounds(measureBoundingBox(geometry), 2)
    if (geom2.isA(geometry)) return calculateEpsilonFromBounds(measureBoundingBox(geometry), 2)
    if (geom3.isA(geometry)) return calculateEpsilonFromBounds(measureBoundingBox(geometry), 3)
    if (slice.isA(geometry)) return calculateEpsilonFromBounds(measureBoundingBox(geometry), 3)
    return 0
  })
  return results.length === 1 ? results[0] : results
}
