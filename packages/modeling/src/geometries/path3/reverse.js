/**
 * Reverses the path so that the vertices are in the opposite order.
 *
 * This swaps the left (interior) and right (exterior) edges.
 *
 * @param {Path3} geometry - the path to reverse
 * @returns {Path3} a new path
 * @alias module:modeling/path3.reverse
 *
 * @example
 * let newPath = path3.reverse(oldPath)
 */
export const reverse = (geometry) => {
  // NOTE: this only updates the order of the vertices
  const vertices = geometry.vertices.slice().reverse()
  // use Object.assign in order to assign EXTRA attributes like color, name, etc
  return Object.assign({}, geometry, { vertices })
}
