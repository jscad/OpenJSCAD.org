const canonicalize = require('./canonicalize')

/**
 * Produces a new array containing the path's point data.
 * This will be an array of canonicalized vec3.
 * The points returned should not be modified as they may be shared between
 *   callers.
 * @param {path2} path - the path to canonicalize.
 * @returns {Array<vec3>} - the array of canonicalized vec3.
 * @example
 * toPointArray(path)
 */
const toPointArray = (options, path) => {
  return canonicalize(path).points
}

module.exports = toPointArray
