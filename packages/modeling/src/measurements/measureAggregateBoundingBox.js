const flatten = require('../utils/flatten')

const measureBoundingBox = require('./measureBoundingBox')

/**
 * Measure the min and max bounds of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the min and max bounds for each geometry, i.e. [[X,Y,Z],[X,Y,Z]]
 * @alias module:modeling/measurements.measureBoundingBox
 *
 * @example
 * let bounds = measureBoundingBox(sphere())
 */
const measureAggregateBoundingBox = (...geometries) => {
  geometries = flatten(geometries)
  const bounds = measureBoundingBox(geometries)
  if (geometries.length === 1) {
    return bounds
  }

  const result = [[Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE], [Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE]]
  return bounds.reduce((result, item) => {
    for (let i = 0; i < 3; i++) {
      result[0][i] = Math.min(result[0][i], item[0][i])
      result[1][i] = Math.max(result[1][i], item[1][i])
    }
    return result
  }, result)
}

module.exports = measureAggregateBoundingBox
