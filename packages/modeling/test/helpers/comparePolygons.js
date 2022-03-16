const compareVectors = require('./compareVectors')

/**
 * Compare two polygons for equality
 * @param (poly3} poly1 - polygon with plane and vertices
 * @param (poly3} poly2 - polygon with plane and vertices
 * @returns {boolean} result of comparison
 */
const comparePolygons = (poly1, poly2) => {
  if (poly1.vertices.length === poly2.vertices.length) {
    return poly1.vertices.reduce((valid, vertex, index) => valid && compareVectors(poly1.vertices[index], poly2.vertices[index]), true)
  }
  return false
}

module.exports = comparePolygons
