/**
 * All shapes (primitives or the results of operations) can be measured, e.g. calculate volume, etc.
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
  measureBoundingSphere: require('./measureBoundingSphere'),
  measureCenter: require('./measureCenter'),
  measureCenterOfMass: require('./measureCenterOfMass'),
  measureDimensions: require('./measureDimensions'),
  measureEpsilon: require('./measureEpsilon'),
  measureVolume: require('./measureVolume')
}
