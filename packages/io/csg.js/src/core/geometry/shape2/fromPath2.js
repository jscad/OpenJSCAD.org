const fromPoints = require('./fromPoints')

/** Construct a CAG from a 2d-path (a closed sequence of points).
 * Like fromPoints() but does not check if the result is a valid polygon.
 * @param {path} Path2 - a Path2 path
 * @returns {CAG} new CAG object
 */
const fromPath2 = function (path) {
  if (!path.isClosed()) throw new Error('The path should be closed!')
  return fromPoints(path.getPoints())
}

module.exports = fromPath2
