/**
 * Utility functions for maths.
 * @module modeling/maths/utils
 * @example
 * const { area, solve2Linear } = require('@jscad/maths').utils
 */
module.exports = {
  aboutEqualNormals: require('./aboutEqualNormals'),
  area: require('./area'),
  cos: require('./trigonometry').cos,
  interpolateBetween2DPointsForY: require('./interpolateBetween2DPointsForY'),
  intersect: require('./intersect'),
  sin: require('./trigonometry').sin,
  solve2Linear: require('./solve2Linear')
}
