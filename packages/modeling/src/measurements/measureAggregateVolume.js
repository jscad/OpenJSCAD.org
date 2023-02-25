import { flatten } from '../utils/index.js'

import { measureVolume } from './measureVolume.js'

/**
 * Measure the total (aggregate) volume for the given geometries.
 * Note: This measurement will not account for overlapping geometry
 * @param {...Object} geometries - the geometries to measure.
 * @return {Number} the volume for the group of geometry.
 * @alias module:modeling/measurements.measureAggregateVolume
 *
 * @example
 * let totalVolume = measureAggregateVolume(sphere(),cube())
 */
export const measureAggregateVolume = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('measureAggregateVolume: no geometries supplied')
  const volumes = measureVolume(geometries)
  if (geometries.length === 1) {
    return volumes
  }
  const result = 0
  return volumes.reduce((result, volume) => result + volume, result)
}
