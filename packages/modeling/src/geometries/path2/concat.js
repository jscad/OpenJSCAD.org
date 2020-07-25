const fromPoints = require('./fromPoints')
const toPoints = require('./toPoints')

/**
 * Concatenate the given paths.
 * A concatenation of zero paths is an empty, open path.
 * A concatenation of one closed path to a series of open paths produces a closed path.
 * A concatenation of a path to a closed path is an error.
 * @param {...path2} paths - the paths to concatenate
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.concat
 *
 * @example
 * let newpath = concat(fromPoints({}, [[1, 2]]), fromPoints({}, [[3, 4]]))
 */
const concat = (...paths) => {
  // Only the last path can be closed, producing a closed path.
  let isClosed = false
  for (const path of paths) {
    if (isClosed) {
      throw new Error('Cannot concatenate to a closed path')
    }
    isClosed = path.isClosed
  }
  let newpoints = []
  paths.forEach((path) => {
    newpoints = newpoints.concat(toPoints(path))
  })
  return fromPoints({ closed: isClosed }, newpoints)
}

module.exports = concat
