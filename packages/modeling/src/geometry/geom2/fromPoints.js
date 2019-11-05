const vec2 = require('../../math/vec2')

const create = require('./create')

/**
 * Create a new 2D geometry from the given points.
 * The direction (rotation) of the points is not relevant,
 * as the points can define a convex or a concave polygon.
 * The geometry must not self intersect, i.e. the sides cannot cross.
 * @param {Array} points - list of points in 2D space where each point is an array of two values
 * @returns {geom2} a new geometry
 */
const fromPoints = function (points) {
  if (!Array.isArray(points)) {
    throw new Error('the given points must be an array')
  }
  if (points.length < 3) {
    throw new Error('the given points must define a closed geometry with three or more points')
  }

  let sides = []
  let prevpoint = points[points.length - 1]
  points.forEach(function (point) {
    sides.push([vec2.fromArray(prevpoint), vec2.fromArray(point)])
    prevpoint = point
  })
  return create(sides)
}

module.exports = fromPoints
