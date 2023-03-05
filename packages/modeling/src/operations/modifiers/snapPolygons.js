import * as vec3 from '../../maths/vec3/index.js'

import * as poly3 from '../../geometries/poly3/index.js'

const isValidPoly3 = (epsilon, polygon) => {
  const area = Math.abs(poly3.measureArea(polygon))
  return (Number.isFinite(area) && area > epsilon)
}

/*
 * Snap the given list of polygons to the epsilon.
 */
export const snapPolygons = (epsilon, polygons) => {
  let newPolygons = polygons.map((polygon) => {
    const snapVertices = polygon.vertices.map((vertex) => vec3.snap(vec3.create(), vertex, epsilon))
    // only retain unique vertices
    const newVertices = []
    for (let i = 0; i < snapVertices.length; i++) {
      const j = (i + 1) % snapVertices.length
      if (!vec3.equals(snapVertices[i], snapVertices[j])) newVertices.push(snapVertices[i])
    }
    const newPolygon = poly3.create(newVertices)
    if (polygon.color) newPolygon.color = polygon.color
    return newPolygon
  })
  // snap can produce polygons with zero (0) area, remove those
  const epsilonArea = (epsilon * epsilon * Math.sqrt(3) / 4)
  newPolygons = newPolygons.filter((polygon) => isValidPoly3(epsilonArea, polygon))
  return newPolygons
}
