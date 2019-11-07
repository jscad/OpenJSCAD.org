const path2 = require('../geometry/path2')

/** Create a new line (path) from the given points.
 * The points must be provided as an array, where each element is an array of two numbers.
 * @param {Array} points - array of points from which to create the path
 * @returns {path2} new path
 * @example:
 * my newpath = line([[10, 10], [-10, 10]])
 */
const line = (points) => {
  if (!Array.isArray(points)) throw new Error('points must be an array')

  return path2.fromPoints({}, points)
}

module.exports = line
