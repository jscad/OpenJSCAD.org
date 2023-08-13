import { create } from './create.js'

/**
 * Reverse the edges of the given slice.
 *
 * @param {Slice} slice - slice to reverse
 * @returns {Slice} reverse of the slice
 * @alias module:modeling/geometries/slice.reverse
 */
export const reverse = (slice) => {
  // reverse each contour
  const contours = slice.contours.map((contour) => contour.slice().reverse())
  return create(contours)
}
