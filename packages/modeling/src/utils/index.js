/**
 * Utility functions of various sorts, including conversions from different angular measures.
 * @module modeling/utils
 * @example
 * const { areAllShapesTheSameType, degToRad, radiusToSegments, radToDeg } = require('@jscad/modeling').utils
 */
module.exports = {
  areAllShapesTheSameType: require('./areAllShapesTheSameType'),
  degToRad: require('./degToRad'),
  flatten: require('./flatten'),
  fnNumberSort: require('./fnNumberSort'),
  insertSorted: require('./insertSorted'),
  radiusToSegments: require('./radiusToSegments'),
  radToDeg: require('./radToDeg')
}
