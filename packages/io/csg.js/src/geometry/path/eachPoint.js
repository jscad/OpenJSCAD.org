const canonicalize = require('./canonicalize')

/**
 * Calls a function for each point in the path in order.
 * @param {path2} path - the path to canonicalize.
 * @param {function} thunk - the function to call.
 * @example
 * eachPoint(path, accumulate)
 */
const eachPoint = (options, thunk, path) => {
  canonicalize(path).points.forEach(thunk)
}

module.exports = eachPoint
