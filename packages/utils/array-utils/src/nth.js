/**
 * Return the Nth element of the given array.
 * @param {*} array - anything
 * @param {Number} index - index of the element to return
 * @returns {*} Nth element of the array, or undefined
 * @alias module:array-utils.nth
 * @example
 * let value = nth([1], 2) // undefined
 * let value = nth([1, 2, 3, 4, 5], 3) // 4
 */
const nth = (array, index) => {
  if (!Array.isArray(array) || array.length < index) {
    return undefined
  }
  return array[index]
}

module.exports = nth
