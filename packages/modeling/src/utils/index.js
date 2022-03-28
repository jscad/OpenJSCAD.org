/**
 * Utility functions of various sorts.
 * @module modeling/utils
 * @example
 * const { flatten, insertSorted } = require('@jscad/modeling').utils
 */
module.exports = {
  areAllShapesTheSameType: require('./areAllShapesTheSameType'),
  cos: require('./trigonometry').cos,
  degToRad: require('./degToRad'),
  flatten: require('./flatten'),
  fnNumberSort: require('./fnNumberSort'),
  insertSorted: require('./insertSorted'),
  radiusToSegments: require('./radiusToSegments'),
  radToDeg: require('./radToDeg'),
  sin: require('./trigonometry').sin
}
