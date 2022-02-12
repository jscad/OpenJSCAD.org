/**
 * Mend gaps in a 2D geometry to make it a closed polygon
 */
const repairGeom2 = (geometry) => {
  // TODO: Apply transforms? (could affect x/y/z stretch for distance)
  const vertexMap = {} // string key to vertex map
  const edgeCount = {} // count of (in - out) edges
  geometry.sides.forEach((edge) => {
    const inKey = edge[0].toString()
    const outKey = edge[1].toString()
    vertexMap[inKey] = edge[0]
    vertexMap[outKey] = edge[1]
    edgeCount[inKey] = (edgeCount[inKey] || 0) + 1 // in
    edgeCount[outKey] = (edgeCount[outKey] || 0) - 1 // out
  })
  // find vertices which are missing in or out edges
  const missingIn = Object.keys(edgeCount).filter((e) => edgeCount[e] < 0)
  const missingOut = Object.keys(edgeCount).filter((e) => edgeCount[e] > 0)
  // pairwise distance of bad vertices
  missingIn.forEach((key1) => {
    const v1 = vertexMap[key1]
    // find the closest vertex that is missing an out edge
    let bestDistance = Infinity
    let bestReplacement = undefined
    missingOut.forEach((key2) => {
      const v2 = vertexMap[key2]
      const distance = Math.hypot(v1[0] - v2[0], v1[1] - v2[1])
      if (distance < bestDistance) {
        bestDistance = distance
        bestReplacement = v2
      }
    })
    console.log(`Repair gap ${v1} → ${bestReplacement} dist ${bestDistance}`)
    // merge broken vertices
    geometry.sides.forEach((edge) => {
      if (edge[0].toString() === key1) edge[0] = bestReplacement
      if (edge[1].toString() === key1) edge[1] = bestReplacement
    })
  })
  return geometry
}

module.exports = repairGeom2
