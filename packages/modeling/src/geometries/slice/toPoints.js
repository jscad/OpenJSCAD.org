/**
 * Produces an array of points from the given slice.
 * The returned array should not be modified as the data is shared with the slice.
 * @param {slice} slice - the slice
 * @returns {Array} an array of 3D points
 * @alias module:modeling/extrusions/slice.toPoints
 *
 * @example
 * let sharedPoints = toPoints(slice)
 */
export const toPoints = (slice) => {
  const points = []
  slice.contours.forEach((part) => {
    part.forEach((point) => {
      points.push(point)
    })
  })
  return points
}

export default toPoints
