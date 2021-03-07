/**
 * Utility functions for arrays.
 * @module array-utils
 * @example
 * const { flatten, head } = require('@jscad/array-utils')
 */

/**
 * Convert the given array to an array if not already an array.
 * @param {*} array - anything
 * @returns {Array} an array
 * @alias module:array-utils.toArray
 */
const toArray = (array) => {
  if (Array.isArray(array)) return array
  if (array === undefined || array === null) return []
  return [array]
}

/**
 * Return the first item of an array.
 * @param {*} array - anything
 * @returns {*} first item of the array, or undefined
 * @alias module:array-utils.head
 */
const head = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined
  }
  return array[0]
}

/**
 * Flatten the given list of arguments into a single flat array.
 * The arguments can be composed of multiple depths of objects and arrays.
 * @param {Array} array - list of arguments
 * @returns {Array} a flat list of arguments
 * @alias module:array-utils.flatten
 */
const flatten = (array) => array.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), [])

/**
 * Return the Nth element of an array.
 * @param {Integer} index - index of item to return
 * @param {*} array - anything
 * @returns {*} Nth item of the array, or undefined
 * @alias module:array-utils.nth
 */
const nth = (index, array) => {
  if (!Array.isArray(array) || array.length < index) {
    return undefined
  }
  return array[index]
}

module.exports = { toArray, head, flatten, nth }
