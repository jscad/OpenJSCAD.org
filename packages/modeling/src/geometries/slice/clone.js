
/**
 * Create a deep clone of the given slice.
 *
 * @param {Slice} slice - slice to clone
 * @returns {Slice} a new slice
 * @alias module:modeling/slice.clone
 *
 * @example
 * const newSlice = slice.clone(oldSlice)
 */
export const clone = (slice) => Object.assign({}, slice)
