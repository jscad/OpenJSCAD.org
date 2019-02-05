const poly3 = require('../poly3')

/** returns the triangles of this shape3
 * @returns {Polygons} triangulated polygons
 */
const toTriangles = (shape3) => {
  const polygons = []
  shape3.polygons.forEach((poly) => {
    const firstVertex = poly.vertices[0]
    for (let i = poly.vertices.length - 3; i >= 0; i--) {
      const triangle = poly3.fromPoints(
        [
          firstVertex,
          poly.vertices[i + 1],
          poly.vertices[i + 2]
        ]
        // TODO poly.shared,
      )
      polygons.push(triangle)
    }
  })
  return polygons
}

module.exports = toTriangles
