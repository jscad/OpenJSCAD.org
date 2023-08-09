
/**
 * Create a deep clone of the given slice.
 *
 * @param {Slice} slice - slice to clone
 * @returns {Slice} a new slice
 * @alias module:modeling/geometries/slice.clone
 */
export const clone = (slice) => Object.assign({}, slice)
