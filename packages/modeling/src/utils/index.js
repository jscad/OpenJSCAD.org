/**
 * Utility functions of various sorts.
 * @module modeling/utils
 * @example
 * const { flatten, insertSorted } = require('@jscad/modeling').utils
 */
module.exports = {
  areAllShapesTheSameType: require('./areAllShapesTheSameType'),
  degToRad: require('./degToRad'),
  flatten: require('./flatten'),
  fnNumberSort: require('./fnNumberSort'),
  getSegmentsFromRadius: require('./getSegmentsFromRadius'),
  insertSorted: require('./insertSorted'),
  radToDeg: require('./radToDeg')
}
