const vec3 = require('../../maths/vec3')

const poly3 = require('../../geometries/poly3')

const isValidPoly3 = (epsilon, polygon) => {
  if (poly3.isA(polygon)) {
    const area = poly3.measureArea(polygon)
    return (Number.isFinite(area) && area > epsilon)
  }
  return false
}

/*
 * Snap the given list of polygons to the epsilon.
 */
const snapPolygons = (epsilon, polygons) => {
  let newpolygons = polygons.map((polygon) => {
    const newvertices = polygon.vertices.map((vertice) => vec3.snap(vec3.create(), epsilon, vertice))
    return poly3.create(newvertices)
  })
  // snap can produce polygons with zero (0) area, remove those
  const epsilonArea = (epsilon * epsilon * Math.sqrt(3) / 4)
  newpolygons = newpolygons.filter((polygon) => isValidPoly3(epsilonArea, polygon))
  return newpolygons
}

module.exports = snapPolygons
