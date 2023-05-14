/**
 * Produces an array of edges from the given slice.
 * The returned array should not be modified as the data is shared with the slice.
 * @param {slice} slice - the slice
 * @returns {Array} an array of edges, each edge contains an array of two vertices (3D)
 * @alias module:modeling/geometries/slice.toEdges
 *
 * @example
 * let sharedEdges = toEdges(slice)
 */
export const toEdges = (slice) => {
  const edges = []
  slice.contours.forEach((contour) => {
    contour.forEach((vertex, i) => {
      const next = contour[(i + 1) % contour.length]
      edges.push([vertex, next])
    })
  })
  return edges
}
