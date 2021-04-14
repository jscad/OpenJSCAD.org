/**
 * Flatten the given list of arguments into a single flat array.
 * The arguments can be composed of multiple depths of objects and arrays.
 * @param {Array} arr - list of arguments
 * @returns {Array} a flat list of arguments
 * @alias module:modeling/utils.flatten
 */
const flatten = (arr) => arr.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), [])

module.exports = flatten
