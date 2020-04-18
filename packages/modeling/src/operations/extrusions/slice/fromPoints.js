const vec3 = require('../../../math/vec3')

const create = require('./create')

/**
 * Create a slice from the given points.
 *
 * @param {vec2[]|vec3[]} points - list of points
 *
 * @example
 * const points = [
 *   [0,  0],
 *   [0, 10],
 *   [0, 10]
 * ]
 * const slice = fromPoints(points)
 */
const fromPoints = (points) => {
  if (!Array.isArray(points)) throw new Error('the given points must be an array')
  if (points.length < 3) throw new Error('the given points must contain THREE or more points')

  // create a list of edges from the points
  let edges = []
  let prevpoint = points[points.length - 1]
  points.forEach((point) => {
    if (point.length === 2) edges.push([vec3.fromVec2(prevpoint), vec3.fromVec2(point)])
    if (point.length === 3) edges.push([prevpoint, point])
    prevpoint = point
  })
  return create(edges)
}

module.exports = fromPoints
