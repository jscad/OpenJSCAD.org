const Vector3D = require('./Vector3')
const Vertex = require('./Vertex3')
const Polygon3 = require('./Polygon3')

// FIXME : redundant code with Polygon3.createFromPoints , but unuseable due to circular dependencies
/** Create a polygon from the given points.
 *
 * @param {Array[]} points - list of points
 * @param {Polygon.Shared} [shared=defaultShared] - shared property to apply
 * @param {Plane} [plane] - plane of the polygon
 *
 * @example
 * const points = [
 *   [0,  0, 0],
 *   [0, 10, 0],
 *   [0, 10, 10]
 * ]
 * let polygon = CSG.Polygon.createFromPoints(points)
 */
const fromPoints = function (points, shared, plane) {
  let vertices = []
  points.map(function (p) {
    let vec = new Vector3D(p)
    let vertex = new Vertex(vec)
    vertices.push(vertex)
  })

  let polygon
  if (arguments.length < 3) {
    polygon = new Polygon3(vertices, shared)
  } else {
    polygon = new Polygon3(vertices, shared, plane)
  }
  return polygon
}

module.exports = {fromPoints}
