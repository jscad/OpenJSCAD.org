const plane = require('../../../maths/plane')
const vec3 = require('../../../maths/vec3')

/**
 * Calculate the plane of the given slice.
 * NOTE: The slice (and all points) are assumed to be planar from the beginning.
 * @param {slice} slice - the slice
 * @returns {plane} the plane of the slice
 * @alias module:modeling/extrusions/slice.calculatePlane
 *
 * @example
 * let myplane = calculatePlane(slice)
 */
const calculatePlane = (slice) => {
  const edges = slice.edges
  if (edges.length < 3) throw new Error('slices must have 3 or more edges to calculate a plane')

  // find the midpoint of the slice, which will lie on the plane by definition
  const midpoint = edges.reduce((point, edge) => vec3.add(point, edge[0]), vec3.create())
  vec3.scale(midpoint, 1 / edges.length, midpoint)

  // find the farthest edge from the midpoint, which will be on an outside edge
  let farthestEdge = [[NaN, NaN, NaN], [NaN, NaN, NaN]]
  let distance = 0
  edges.forEach((edge) => {
    const d = vec3.squaredDistance(midpoint, edge[0])
    if (d > distance) {
      farthestEdge = edge
      distance = d
    }
  })

  return plane.fromPoints(midpoint, farthestEdge[0], farthestEdge[1])
}

module.exports = calculatePlane
