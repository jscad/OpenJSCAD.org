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
export const reverse = (geometry) => {
  // reverse each contour
  const contours = geometry.contours.map((contour) => contour.slice().reverse())
  // use Object.assign in order to assign EXTRA attributes like color, name, etc
  return Object.assign({}, geometry, { contours })
}
