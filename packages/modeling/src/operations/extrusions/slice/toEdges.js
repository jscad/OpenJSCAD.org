/**
 * Produces an array of edges from the given slice.
 * The returned array should not be modified as the data is shared with the slice.
 * @param {slice} slice - the slice
 * @returns {Array} an array of edges, each edge contains an array of two points (3D)
 * @alias module:modeling/extrusions/slice.toEdges
 *
 * @example
 * let sharededges = toEdges(slice)
 */
export const toEdges = (slice) => {
  const edges = []
  slice.parts.forEach((part) => {
    part.forEach((point, i) => {
      const next = part[(i + 1) % part.length]
      edges.push([point, next])
    })
  })
  return edges
}

export default toEdges
