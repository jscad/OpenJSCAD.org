/**
 * Utility functions of various sorts.
 * @module modeling/utils
 * @example
 * const { flatten, insertSorted } = require('@jscad/modeling').utils
 */
module.exports = {
  areAllShapesTheSameType: require('./areAllShapesTheSameType'),
  flatten: require('./flatten'),
  fnNumberSort: require('./fnNumberSort'),
  insertSorted: require('./insertSorted'),
  interpolateBetween2DPointsForY: require('./interpolateBetween2DPointsForY')
}
