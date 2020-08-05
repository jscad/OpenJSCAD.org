const toPoints = require('./toPoints')

/**
 * Calls a function for each point in the geometry.
 * @param {Object} options - options
 * @param {Function} thunk - the function to call
 * @param {path2} geometry - the geometry to traverse
 * @alias module:modeling/geometries/path2.eachPoint
 *
 * @example
 * eachPoint({}, accumulate, geometry)
 */
const eachPoint = (options, thunk, path) => {
  toPoints(path).forEach(thunk)
}

module.exports = eachPoint
