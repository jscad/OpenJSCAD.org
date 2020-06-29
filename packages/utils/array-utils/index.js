/**
 * converts input data to array if it is not already an array
 * @param {Array} array
 */
const toArray = (array) => {
  if (Array.isArray(array)) return array
  if (array === undefined || array === null) return []
  return [array]
}

/**
 * returns the first item of an array, or undefined if the array is empty or undefined
 * @param {Array} array
 */
const head = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined
  }
  return array[0]
}

/**
 * flatten the given argument into a single flat array
 * the argument can be composed of multiple depths of values and arrays
 * @param {Array} array
 */
const flatten = (array) => array.reduce((acc, val) => Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), [])

/**
 * helper function to retrieve the nth element of an array
 * if the array is undefined or empty, returns undefined, otherwise returns the item at the given index
 * @param {Integer} index
 * @param {Array} array
 */
const nth = (index, array) => {
  if (!Array.isArray(array) || array.length < index) {
    return undefined
  }
  return array[index]
}

module.exports = { toArray, head, flatten, nth }
