const flatten = require('../utils/flatten')

const measureBoundingBox = require('./measureBoundingBox')

/**
 * Measure the dimensions of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the dimensions for each geometry, i.e. [width, depth, height]
 * @alias module:modeling/measurements.measureDimensions
 *
 * @example
 * let dimensions = measureDimensions(sphere())
 */
const measureDimensions = (...geometries) => {
  geometries = flatten(geometries)

  const results = geometries.map((geometry) => {
    const boundingBox = measureBoundingBox(geometry)
    return [
      boundingBox[1][0] - boundingBox[0][0],
      boundingBox[1][1] - boundingBox[0][1],
      boundingBox[1][2] - boundingBox[0][2]
    ]
  })
  return results.length === 1 ? results[0] : results
}

module.exports = measureDimensions
