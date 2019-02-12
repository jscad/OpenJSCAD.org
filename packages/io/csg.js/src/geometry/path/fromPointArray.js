const create = require('./create')
const vec3 = require('../../math/vec3')

/**
 * Create a path2 from a point array.
 * The point array is an array of points, where a point is an array of two
 *   numbers.
 * @param {PointArray} pointArray - array of points to create the path from.
 * @param {boolean} options.closed - if the path should be open or closed.
 * @example:
 * path2.fromPointArray({ closed: true }, [[10,10], [-10,10]])
 */
const fromPointArray = ({ closed = false }, pointArray) => {
  let created = create()
  created.isClosed = closed
  created.basePoints = pointArray.map(vec3.canonicalize)
  // If we are feeling trusting we could say path.points = path.basePoints
  // and make the path canonical at this point. Let's keep basePoints and
  // points distinct for now.
  created.points = undefined
  created.isCanonicalized = false
  return created
}

module.exports = fromPointArray
