const flatten = require('../utils/flatten')

const measureBoundingBox = require('./measureBoundingBox')

/**
 * Measure the center of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the center point for each geometry, i.e. [X, Y, Z]
 * @alias module:modeling/measurements.measureCenter
 *
 * @example
 * let center = measureCenter(sphere())
 */
const measureCenter = (...geometries) => {
  geometries = flatten(geometries)

  const results = geometries.map((geometry) => {
    const bounds = measureBoundingBox(geometry)
    return [
      (bounds[0][0] + ((bounds[1][0] - bounds[0][0]) / 2)),
      (bounds[0][1] + ((bounds[1][1] - bounds[0][1]) / 2)),
      (bounds[0][2] + ((bounds[1][2] - bounds[0][2]) / 2))
    ]
  })
  return results.length === 1 ? results[0] : results
}

module.exports = measureCenter
