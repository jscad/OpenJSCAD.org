const vec3 = require('../../maths/vec3')

const poly3 = require('../../geometries/poly3')

const isValidPoly3 = (epsilon, polygon) => {
  const area = Math.abs(poly3.measureArea(polygon))
  return (Number.isFinite(area) && area > epsilon)
}

/*
 * Snap the given list of polygons to the epsilon.
 */
const snapPolygons = (epsilon, polygons) => {
  let newpolygons = polygons.map((polygon) => {
    const snapvertices = polygon.vertices.map((vertice) => vec3.snap(vec3.create(), vertice, epsilon))
    // only retain unique vertices
    const newvertices = []
    for (let i = 0; i < snapvertices.length; i++) {
      const j = (i + 1) % snapvertices.length
      if (!vec3.equals(snapvertices[i], snapvertices[j])) newvertices.push(snapvertices[i])
    }
    const newpolygon = poly3.create(newvertices)
    if (polygon.color) newpolygon.color = polygon.color
    return newpolygon
  })
  // snap can produce polygons with zero (0) area, remove those
  const epsilonArea = (epsilon * epsilon * Math.sqrt(3) / 4)
  newpolygons = newpolygons.filter((polygon) => isValidPoly3(epsilonArea, polygon))
  return newpolygons
}

module.exports = snapPolygons
