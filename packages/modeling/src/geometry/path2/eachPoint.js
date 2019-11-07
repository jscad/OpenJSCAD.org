const toPoints = require('./toPoints')

/**
 * Calls a function for each point in the path in order.
 * @param {path2} path - the path to traverse
 * @param {function} thunk - the function to call
 * @example
 * eachPoint(path, accumulate)
 */
const eachPoint = (options, thunk, path) => {
  toPoints(path).forEach(thunk)
}

module.exports = eachPoint
