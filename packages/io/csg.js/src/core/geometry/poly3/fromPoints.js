const create = require('./create')

const plane = require('../../math/plane/')
const vec3 = require('../../math/vec3')

/**
 * Create a poly3 from the given points.
 *
 * @param {Array[]} points - list of points
 * @param {plane} [planeof] - plane of the polygon
 *
 * @example
 * const points = [
 *   [0,  0, 0],
 *   [0, 10, 0],
 *   [0, 10, 10]
 * ]
 * const polygon = createFromPoints(points)
 */
const fromPoints = (points, planeof) => {
  const out = create()
  out.vertices = points.map((point) => { return vec3.clone(point) })
  if (planeof !== undefined) out.plane = planeof

  // calculate the plane if not provided
  if (planeof === undefined && out.vertices.length > 2) {
    out.plane = plane.fromPoints(out.vertices[0], out.vertices[1], out.vertices[2])
  }
  return out
}

module.exports = fromPoints
