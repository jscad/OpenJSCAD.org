const vec3 = require('../../maths/vec3')
const poly3 = require('../../geometries/poly3')

const triangulatePolygon = (epsilon, polygon, triangles) => {
  const nv = polygon.vertices.length
  if (nv > 3) {
    if (nv > 4) {
      // split the polygon using a midpoint
      const midpoint = [0, 0, 0]
      polygon.vertices.forEach((vertice) => vec3.add(midpoint, midpoint, vertice))
      vec3.snap(midpoint, vec3.divide(midpoint, midpoint, [nv, nv, nv]), epsilon)
      for (let i = 0; i < nv; i++) {
        const poly = poly3.create([midpoint, polygon.vertices[i], polygon.vertices[(i + 1) % nv]])
        if (polygon.color) poly.color = polygon.color
        triangles.push(poly)
      }
      return
    }
    // exactly 4 vertices, use simple triangulation
    const poly0 = poly3.create([polygon.vertices[0], polygon.vertices[1], polygon.vertices[2]])
    const poly1 = poly3.create([polygon.vertices[0], polygon.vertices[2], polygon.vertices[3]])
    if (polygon.color) {
      poly0.color = polygon.color
      poly1.color = polygon.color
    }
    triangles.push(poly0, poly1)
    return
  }
  // exactly 3 vertices, so return the original
  triangles.push(polygon)
}

/*
 * Convert the given polygons into a list of triangles (polygons with 3 vertices).
 * NOTE: this is possible because poly3 is CONVEX by definition
 */
const triangulatePolygons = (epsilon, polygons) => {
  const triangles = []
  polygons.forEach((polygon) => {
    triangulatePolygon(epsilon, polygon, triangles)
  })
  return triangles
}

module.exports = triangulatePolygons
