const canonicalize = require('./canonicalize')
const fromPointArray = require('./fromPointArray')

/**
 * Produces a path by concatenating the supplied paths.
 * A concatenation of zero paths is an empty, open path.
 * A concatenation of one closed path to a series of open paths produces a
 *   closed path.
 * A concatenation of a path to a closed path is an error.
 * @param {Array<path2>} paths - the paths to concatenate.
 * @returns {path2} - the concatenated path.
 * @example
 * concat(fromPointArray({}, [[1, 2]]), fromPointArray({}, [[3, 4]]))
 */
const concat = (...paths) => {
  // Only the last path can be closed, producing a closed path.
  let isClosed = false;
  for (const path of paths) {
    if (isClosed) {
      throw new Error('Cannot concatenate to a closed path')
    }
    isClosed = path.isClosed;
  }
  return fromPointArray(
             { closed: isClosed },
             [].concat(...paths.map(path => canonicalize(path).points)))
}

module.exports = concat
