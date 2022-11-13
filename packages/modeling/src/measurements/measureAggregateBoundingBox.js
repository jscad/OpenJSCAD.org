import flatten from '../utils/flatten.js'
import vec3min from '../maths/vec3/min.js'
import vec3max from '../maths/vec3/max.js'

import measureBoundingBox from './measureBoundingBox.js'

/**
 * Measure the aggregated minimum and maximum bounds for the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the min and max bounds for the group of geometry, i.e. [[x,y,z],[X,Y,Z]]
 * @alias module:modeling/measurements.measureAggregateBoundingBox
 *
 * @example
 * let bounds = measureAggregateBoundingBox(sphere(),cube())
 */
export const measureAggregateBoundingBox = (...geometries) => {
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

export default measureAggregateBoundingBox
