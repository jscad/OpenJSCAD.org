const vec3 = require('../../math/vec3')

const create = require('./create')

/**
 * Create a polygon from the given points.
 *
 * @param {Array} points - list of points (3D)
 * @returns {poly3} a new polygon
 * @alias module:modeling/geometry/poly3.fromPoints
 *
 * @example
 * const points = [
 *   [0,  0, 0],
 *   [0, 10, 0],
 *   [0, 10, 10]
 * ]
 * const polygon = fromPoints(points)
 */
const fromPoints = (points, planeof) => {
  if (planeof) throw new Error('use fromPointAndPlane')
  if (!Array.isArray(points)) throw new Error('the given points must be an array')
  if (points.length < 3) throw new Error('the given points must contain THREE or more points')

  const vertices = points.map((point) => { return vec3.clone(point) })
  return create(vertices)
}

module.exports = fromPoints
