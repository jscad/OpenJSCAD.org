/**
 * Compare function for sorting arrays of numbers.
 * @param {Number} a - first number
 * @param {Number} b - second number
 * @return {Number} result of a - b
 * @alias module:array-utils.fnNumberSort
 * @example
 * const numbers = [2, 1, 4, 3, 6, 5, 8, 7, 9, 0]
 * const sorted = numbers.sort(fnNumberSort)
 */
export const fnNumberSort = (a, b) => a - b

export default fnNumberSort
