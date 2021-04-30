/**
 * Utility functions for arrays.
 * @module array-utils
 * @example
 * const { flatten, head } = require('@jscad/array-utils')
 */

module.exports = {
  flatten: require('./flatten'),
  fnNumberSort: require('./fnNumberSort'),
  head: require('./head'),
  insertSorted: require('./insertSorted'),
  nth: require('./nth'),
  padToLength: require('./padToLength'),
  toArray: require('./toArray')
}
