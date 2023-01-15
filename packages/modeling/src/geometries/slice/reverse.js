import create from './create.js'

/**
 * Reverse the edges of the given slice.
 *
 * @param {slice} slice - slice to reverse
 * @returns {slice} reverse of the slice
 * @alias module:modeling/geometries/slice.reverse
 */
export const reverse = (slice) => {
  // reverse each contour
  const contours = slice.contours.map((contour) => contour.slice().reverse())
  return create(contours)
}

export default reverse
