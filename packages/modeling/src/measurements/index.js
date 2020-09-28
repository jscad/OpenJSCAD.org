/**
 * All shapes (primitives or the results of operations) can be measured, e.g. calculate volume, etc.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/measurements
 * @example
 * const { measureArea, measureBoundingBox, measureVolume } = require('@jscad/modeling').measurements
 */
module.exports = {
  measureAggregateArea: require('./measureAggregateArea'),
  measureAggregateBoundingBox: require('./measureAggregateBoundingBox'),
  measureAggregateEpsilon: require('./measureAggregateEpsilon'),
  measureAggregateVolume: require('./measureAggregateVolume'),
  measureArea: require('./measureArea'),
  measureBoundingBox: require('./measureBoundingBox'),
  measureEpsilon: require('./measureEpsilon'),
  measureVolume: require('./measureVolume')
}
