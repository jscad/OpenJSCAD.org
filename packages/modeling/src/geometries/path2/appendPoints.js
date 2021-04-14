const fromPoints = require('./fromPoints')
const toPoints = require('./toPoints')

/**
 * Append the given list of points to the end of the given geometry.
 * @param {Array} points - the points (2D) to append to the given path
 * @param {path2} geometry - the given path
 * @returns {path2} a new path with the appended points
 * @alias module:modeling/geometries/path2.appendPoints
 * @example
 * let newpath = appendPoints([[3, 4], [4, 5]], oldpath)
 */
const appendPoints = (points, geometry) => {
  if (geometry.isClosed) {
    throw new Error('cannot append points to a closed path')
  }

  let newpoints = toPoints(geometry)
  newpoints = newpoints.concat(points)

  return fromPoints({}, newpoints)
}

module.exports = appendPoints
