const fromPoints = require('./fromPoints')
const toPoints = require('./toPoints')

/**
 * Append the given list of points to the end of the given geometry.
 * @param {path2} geometry - the path to concatenate
 * @returns {path2} new path
 * @example
 * let newpath = concat(fromPoints({}, [[1, 2]]), fromPoints({}, [[3, 4]]))
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
