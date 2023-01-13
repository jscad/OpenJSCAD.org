import create from './create.js'

/**
 * Reverse the edges of the given slice.
 *
 * @param {slice} slice - slice to reverse
 * @returns {slice} reverse of the slice
 * @alias module:modeling/extrusions/slice.reverse
 */
export const reverse = (slice) => {
  const out = create()
  // reverse the outlines
  out.parts = slice.parts.map((part) => part.slice().reverse())
  return out
}

export default reverse
