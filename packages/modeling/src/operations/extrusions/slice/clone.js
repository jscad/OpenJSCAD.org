
/**
 * Create a deep clone of the given slice.
 *
 * @param {slice} slice - slice to clone
 * @returns {slice} a new slice
 * @alias module:modeling/extrusions/slice.clone
 */
export const clone = (slice) => Object.assign({}, slice)

export default clone
