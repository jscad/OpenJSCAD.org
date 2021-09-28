/**
 * Utility functions for maths.
 * @module modeling/maths/utils
 * @example
 * const { area, solve2Linear } = require('@jscad/maths').utils
 */
module.exports = {
  aboutEqualNormals: require('./aboutEqualNormals'),
  area: require('./area'),
  interpolateBetween2DPointsForY: require('./interpolateBetween2DPointsForY'),
  intersect: require('./intersect'),
  solve2Linear: require('./solve2Linear')
}
