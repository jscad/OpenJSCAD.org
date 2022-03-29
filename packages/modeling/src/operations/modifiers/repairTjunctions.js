const { polygonsToEdges, edgesToPolygons, cullOpenEdges, splitEdge, removePolygons, addPolygon } = require('./edges')

/*
 * Repair T-junctions by splitting edges.
 */
const repairTjunctions = (epsilon, polygons) => {
  const edges = polygonsToEdges(polygons)
  let openEdges = cullOpenEdges(edges)
  if (openEdges.length === 0) return polygons

  // split open edges until no longer possible
  let splitting = true
  while (splitting) {
    let splitCount = 0
    for (let i = 0; i < openEdges.length; i++) {
      const edge = openEdges[i]
      if (edge && edge.polygons && edge.polygons.length === 1) {
        const newPolygons = splitEdge(openEdges, edge, epsilon)
        if (newPolygons) {
          openEdges[i] = null
          addPolygon(openEdges, newPolygons[0])
          addPolygon(openEdges, newPolygons[1])

          // adjust the master list as well
          removePolygons(edges, edge)
          // add edges for each new polygon
          addPolygon(edges, newPolygons[0])
          addPolygon(edges, newPolygons[1])

          splitCount++
          break // start again
        }
      }
    }
    splitting = (splitCount > 0)
  }
  openEdges = openEdges.filter((edge) => edge && edge.polygons && edge.polygons.length === 1)
  if (openEdges.length > 0) console.warn('Repair of all T-junctions failed:', openEdges.length)

  // rebuild the list of polygons from the edges
  polygons = edgesToPolygons(edges)
  return polygons
}

module.exports = repairTjunctions
