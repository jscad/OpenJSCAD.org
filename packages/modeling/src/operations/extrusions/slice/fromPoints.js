const vec3 = require('../../../maths/vec3')

const create = require('./create')

/**
 * Create a slice from the given points.
 *
 * @param {Array} points - list of points, where each point is either 2D or 3D
 * @returns {slice} a new slice
 * @alias module:modeling/extrusions/slice.fromPoints
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
  const edges = []
  let prevpoint = points[points.length - 1]
  points.forEach((point) => {
    if (point.length === 2) edges.push([vec3.fromVec2(vec3.create(), prevpoint), vec3.fromVec2(vec3.create(), point)])
    if (point.length === 3) edges.push([prevpoint, point])
    prevpoint = point
  })
  return create(edges)
}

module.exports = fromPoints
