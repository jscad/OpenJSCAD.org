const flatten = require('../utils/flatten')

const measureArea = require('./measureArea')

/**
 * Measure the total (aggregate) area for the given geometries.
 * Note: This measurement will not account for overlapping geometry
 * @param {...Object} geometries - the geometries to measure.
 * @return {Number} the total surface area for the group of geometry.
 * @alias module:modeling/measurements.measureAggregateArea
 *
 * @example
 * let totalArea = measureAggregateArea(sphere(),cube())
 */
const measureAggregateArea = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('measureAggregateArea: no geometries supplied')
  const areas = measureArea(geometries)
  if (geometries.length === 1) {
    return areas
  }
  const result = 0
  return areas.reduce((result, area) => result + area, result)
}

module.exports = measureAggregateArea
