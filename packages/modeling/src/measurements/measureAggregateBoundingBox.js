const flatten = require('../utils/flatten')
const vec3min = require('../maths/vec3/min')
const vec3max = require('../maths/vec3/max')

const measureBoundingBox = require('./measureBoundingBox')

/**
 * Measure the aggregated minimum and maximum bounds for the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the min and max bounds for the group of geometry, i.e. [[x,y,z],[X,Y,Z]]
 * @alias module:modeling/measurements.measureAggregateBoundingBox
 *
 * @example
 * let bounds = measureAggregateBoundingBox(sphere(),cube())
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
    result = [vec3min(result[0], result[0], item[0]), vec3max(result[1], result[1], item[1])]
    return result
  }, result)
}

module.exports = measureAggregateBoundingBox
