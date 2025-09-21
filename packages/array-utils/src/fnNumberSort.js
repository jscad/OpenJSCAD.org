/**
 * Compare function for sorting arrays of numbers.
 *
 * @param {number} a - first number
 * @param {number} b - second number
 * @return {number} result of a - b
 *
 * @alias module:array-utils.fnNumberSort
 * @function
 *
 * @example
 * const numbers = [2, 1, 4, 3, 6, 5, 8, 7, 9, 0]
 * const sorted = numbers.sort(fnNumberSort)
 */
export const fnNumberSort = (a, b) => a - b
