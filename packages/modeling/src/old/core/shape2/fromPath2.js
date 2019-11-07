const fromPoints = require('./fromPoints')

/** Construct a Shape2 from a closed 2d-path (a closed sequence of points).
 * Like fromPoints() but does not check if the result is a valid polygon.
 * @param {path} Path2 - a Path2 path
 * @returns {Shape2} new Shape2 object
 */
const fromPath2 = path => {
  if (!path.isClosed()) throw new Error('The path should be closed!')
  return fromPoints(path.getPoints())
}

module.exports = fromPath2
