const { polygonsToEdges, edgesToPolygons, cullOpenEdges, splitEdge, removePolygons, addPolygon } = require('./edges')

/*
 */
const repairTjunctions = (epsilon, polygons) => {
  const edges = polygonsToEdges(polygons)
  let openedges = cullOpenEdges(edges)
  if (openedges.length === 0) return polygons

  // split open edges until no longer possible
  let splitting = true
  while (splitting) {
    let splitcount = 0
    for (let i = 0; i < openedges.length; i++) {
      const edge = openedges[i]
      if (edge && edge.polygons && edge.polygons.length === 1) {
        const newpolygons = splitEdge(openedges, edge, epsilon)
        if (newpolygons) {
          openedges[i] = null
          addPolygon(openedges, newpolygons[0])
          addPolygon(openedges, newpolygons[1])

          // adjust the master list as well
          removePolygons(edges, edge)
          // add edges for each new polygon
          addPolygon(edges, newpolygons[0])
          addPolygon(edges, newpolygons[1])

          splitcount++
          break // start again
        }
      }
    }
    splitting = (splitcount > 0)
  }
  openedges = openedges.filter((edge) => (edge && edge.polygons && edge.polygons.length === 1))
  if (openedges.length > 0) console.warn('Repair of all T-junctions failed:', openedges.length)

  // rebuild the list of polygons from the edges
  polygons = edgesToPolygons(edges)
  return polygons
}

module.exports = repairTjunctions
