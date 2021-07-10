const vec2 = require('../../maths/vec2')

const create = require('./create')

/**
 * Create a new 2D geometry from the given points.
 * The direction (rotation) of the points is not relevant,
 * as the points can define a convex or a concave polygon.
 * The geometry must not self intersect, i.e. the sides cannot cross.
 * @param {Array} points - list of points in 2D space
 * @returns {geom2} a new geometry
 * @alias module:modeling/geometries/geom2.fromPoints
 */
const fromPoints = (points) => {
  if (!Array.isArray(points)) {
    throw new Error('the given points must be an array')
  }
  let length = points.length
  if (length < 3) {
    throw new Error('the given points must define a closed geometry with three or more points')
  }
  // adjust length if the given points are closed by the same point
  if (vec2.equals(points[0], points[length - 1])) --length

  const sides = []
  let prevpoint = points[length - 1]
  for (let i = 0; i < length; i++) {
    const point = points[i]
    sides.push([vec2.clone(prevpoint), vec2.clone(point)])
    prevpoint = point
  }
  return create(sides)
}

module.exports = fromPoints
