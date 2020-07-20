/**
 * All shapes (primitives or the results of operations) can be measured, e.g. calculate volume, etc.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/measurements
 * @example
 * const { measureArea, measureBounds, measureVolume } = require('@jscad/modeling').measurements
 */
module.exports = {
  measureArea: require('./measureArea'),
  measureBounds: require('./measureBounds'),
  measureVolume: require('./measureVolume')
}
