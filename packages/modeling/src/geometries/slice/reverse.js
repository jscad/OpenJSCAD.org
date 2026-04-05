import { create } from './create.js'

/**
 * Reverse the contours of the given slice.
 *
 * @param {Slice} slice - slice to reverse
 * @returns {Slice} reverse of the slice
 * @alias module:modeling/slice.reverse
 *
 * @example
 * const newSlice = slice.reverse(oldSlice)
 */
export const reverse = (slice) => {
  // reverse each contour
  const contours = slice.contours.map((contour) => contour.slice().reverse())
  return create(contours)
}
