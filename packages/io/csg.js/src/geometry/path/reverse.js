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
  const cloned = clone(path)
  // The points don't move, so we can keep the transforms.
  // Just reverse the base points, and we're good to go.
  cloned.basePoints = path.basePoints.slice().reverse()
  cloned.points = undefined
  cloned.isCanonicalized = false
  return cloned
}

module.exports = reverse
