const clone = require('./clone')
const vec3 = require('../../math/vec3')

/**
 * Appends a point to an open path.
 * @param {Object} options - options to describe the path to point.
 * @param {vec2|vec3} point - the waypoint to append to the path.
 * @param {path} path - the path appended to.
 * @returns {path} the new path produced.
 * @example
 * appendPoint({}, vec3.fromValues(1, 1, 0), path.fromPointArray([[0, 0, 0]]))
 * (should produce [[0, 0, 0], [1, 1, 0]])
 */
const appendPoint = (options, point, path) => {
  if (path.isClosed) {
    throw new Error('Cannot append to closed path')
  }
  const cloned = clone(path)
  cloned.basePoints = path.basePoints.concat([vec3.canonicalize(point)])
  cloned.points = undefined
  cloned.isCanonicalized = false
  return cloned
}

module.exports = appendPoint
