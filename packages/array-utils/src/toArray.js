/**
 * Convert the given array to an array if not already an array.
 *
 * @param {*} array - anything
 * @returns {Array} an array
 *
 * @alias module:array-utils.toArray
 * @function
 *
 * @example
 * const array = toArray(1) // [1]
 */
export const toArray = (array) => {
  if (Array.isArray(array)) return array
  if (array === undefined || array === null) return []
  return [array]
}
