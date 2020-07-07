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
const fromPoints = (points) => {
  const vertices = points.map((point) => vec3.clone(point))
  return create(vertices)
}

module.exports = fromPoints
