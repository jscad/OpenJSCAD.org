/**
 * Produces an array of edges from the given slice.
 * The returned array should not be modified as the data is shared with the slice.
 * @param {slice} slice - the slice
 * @returns {Array} an array of edges, each edge contains an array of three points (vec3)
 * @example
 * let sharededges = toEdges(slice)
 */
const toEdges = (slice) => slice.edges

module.exports = toEdges
