const clone = require('./clone')

/**
 * Reverses the path so that the points are in the opposite order.
 * This swaps the left (interior) and right (exterior) edges.
 * @param {path2} geometry - the geometry to reverse
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.reverse
 *
 * @example
 * let newpath = reverse(mypath)
 */
const reverse = (path) => {
  // NOTE: this only updates the order of the points
  const cloned = clone(path)
  cloned.points = path.points.slice().reverse()
  return cloned
}

module.exports = reverse
