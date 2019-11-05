/*
 * Mearsure the area under the given 2D polygon.
 * @param {poly2} polygon - the polgon to measure
 * @return {Float} the area of the polygon
 */
const measureArea = (polygon) => {
  let vertices = polygon.vertices
  let area = 0
  for (let i = 0; i < vertices.length; i++) {
    let j = (i + 1) % vertices.length
    area += vertices[i][0] * vertices[j][1]
    area -= vertices[j][0] * vertices[i][1]
  }
  return (area / 2.0)
}

module.exports = measureArea
