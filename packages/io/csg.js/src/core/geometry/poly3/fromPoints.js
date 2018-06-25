const vec3 = require('../../math/vec3')
const vert3 = require('')
const fromData = require('./fromData')
/** Create a polygon from the given points.
 *
 * @param {Array[]} points - list of points
 * @param {Polygon3.Shared} [shared=defaultShared] - shared property to apply
 * @param {Plane} [plane] - plane of the polygon
 *
 * @example
 * const points = [
 *   [0,  0, 0],
 *   [0, 10, 0],
 *   [0, 10, 10]
 * ]
 * const polygon = createFromPoints(points)
 */
const fromPoints = (points, shared, plane) => {
  // FIXME : this circular dependency does not work !
  // const {fromPoints} = require('./polygon3Factories')
  // return fromPoints(points, shared, plane)
  const vertices = points.map(point => vert3.fromVec3(vec3.fromValues(point)))
  const polygon = fromData(vertices, shared, plane)
  return polygon
}

module.exports = fromPoints
