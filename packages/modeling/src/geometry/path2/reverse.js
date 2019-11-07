const clone = require('./clone')

/**
 * Reverses the path so that the points are in the opposite order.
 * This swaps the left (interior) and right (exterior) edges.
 * Reversal of path segments with options may be non-trivial.
 * @param {path2} path - the path to reverse.
 * @returns {path2} the reversed path.
 * @example
 * reverse(path)
 */
const reverse = (path) => {
  // NOTE: this only updates the order of the points
  const cloned = clone(path)
  cloned.points = path.points.slice().reverse()
  return cloned
}

module.exports = reverse
