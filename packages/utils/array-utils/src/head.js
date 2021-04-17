/**
 * Return the first element of the given array.
 * @param {*} array - anything
 * @returns {*} first element of the array, or undefined
 * @alias module:array-utils.head
 * @example
 * let element = head([1, 2])
 */
const head = (array) => {
  if (!Array.isArray(array) || array.length === 0) {
    return undefined
  }
  return array[0]
}

module.exports = head
