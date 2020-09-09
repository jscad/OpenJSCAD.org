const flatten = require('../utils/flatten')

const measureBoundingBox = require('./measureBoundingBox')

/**
 * Measure a single set of min and max bounds of the group of given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the min and max bounds for the group of geometry, i.e. [[x,y,z],[X,Y,Z]]
 * @alias module:modeling/measurements.measureAggregateBoundingBox
 *
 * @example
 * let bounds = measureAggregateBoundingBox([sphere(),cube()])
 */
const measureAggregateBoundingBox = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('measureAggregateBoundingBox: no geometries supplied')
  const bounds = measureBoundingBox(geometries)
  if (geometries.length === 1) {
    return bounds
  }
  const result = [[Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE], [-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE]]
  return bounds.reduce((result, item) => {
    for (let i = 0; i < 3; i++) {
      result[0][i] = Math.min(result[0][i], item[0][i])
      result[1][i] = Math.max(result[1][i], item[1][i])
    }
    return result
  }, result)
}

module.exports = measureAggregateBoundingBox
