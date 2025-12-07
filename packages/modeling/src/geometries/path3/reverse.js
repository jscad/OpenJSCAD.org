/**
 * Reverses the path so that the vertices are in the opposite order.
 *
 * This swaps the left (interior) and right (exterior) edges.
 *
 * @param {Path3} geometry - the path to reverse
 * @returns {Path3} a new path
 * @function
 * @alias module:modeling/geometries/path3.reverse
 *
 * @example
 * let newPath = reverse(path)
 */
export const reverse = (geometry) => {
  // NOTE: this only updates the order of the vertices
  const cloned = Object.assign({}, geometry)
  cloned.vertices = geometry.vertices.slice().reverse()
  return cloned
}
