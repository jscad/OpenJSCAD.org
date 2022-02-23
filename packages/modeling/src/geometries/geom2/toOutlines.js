const vec2 = require('../../maths/vec2')

const toSides = require('./toSides')

/*
 * Create a list of edges which SHARE vertices.
 * This allows the edges to be traversed in order.
 */
const toSharedVertices = (sides) => {
  const unique = new Map() // {key: vertex}
  const getUniqueVertex = (vertex) => {
    const key = vertex.toString()
    if (unique.has(key)) {
      return unique.get(key)
    } else {
      unique.set(key, vertex)
      return vertex
    }
  }

  return sides.map((side) => side.map(getUniqueVertex))
}

/*
 * Convert a list of sides into a map from vertex to edges.
 */
const toVertexMap = (sides) => {
  const vertexMap = new Map()
  // first map to edges with shared vertices
  const edges = toSharedVertices(sides)
  // construct adjacent edges map
  edges.forEach((edge) => {
    if (vertexMap.has(edge[0])) {
      vertexMap.get(edge[0]).push(edge)
    } else {
      vertexMap.set(edge[0], [edge])
    }
  })
  return vertexMap
}

/**
 * Create the outline(s) of the given geometry.
 * @param  {geom2} geometry
 * @returns {Array} an array of outlines, where each outline is an array of ordered points
 * @alias module:modeling/geometries/geom2.toOutlines
 *
 * @example
 * let geometry = subtract(rectangle({size: [5, 5]}), rectangle({size: [3, 3]}))
 * let outlines = toOutlines(geometry) // returns two outlines
 */
const toOutlines = (geometry) => {
  const vertexMap = toVertexMap(toSides(geometry)) // {vertex: [edges]}
  const outlines = []
  while (true) {
    let startside
    for (const [vertex, edges] of vertexMap) {
      startside = edges.shift()
      if (!startside) {
        vertexMap.delete(vertex)
        continue
      }
      break
    }
    if (startside === undefined) break // all starting sides have been visited

    const connectedVertexPoints = []
    const startvertex = startside[0]
    const v0 = vec2.create()
    while (true) {
      connectedVertexPoints.push(startside[0])
      const nextvertex = startside[1]
      if (nextvertex === startvertex) break // the outline has been closed
      const nextpossiblesides = vertexMap.get(nextvertex)
      if (!nextpossiblesides) {
        throw new Error('the given geometry is not closed. verify proper construction')
      }
      let nextsideindex = -1
      if (nextpossiblesides.length === 1) {
        nextsideindex = 0
      } else {
        // more than one side starting at the same vertex
        let bestangle
        const startangle = vec2.angleDegrees(vec2.subtract(v0, startside[1], startside[0]))
        for (let sideindex = 0; sideindex < nextpossiblesides.length; sideindex++) {
          const nextpossibleside = nextpossiblesides[sideindex]
          const nextangle = vec2.angleDegrees(vec2.subtract(v0, nextpossibleside[1], nextpossibleside[0]))
          let angledif = nextangle - startangle
          if (angledif < -180) angledif += 360
          if (angledif >= 180) angledif -= 360
          if ((nextsideindex < 0) || (angledif > bestangle)) {
            nextsideindex = sideindex
            bestangle = angledif
          }
        }
      }
      const nextside = nextpossiblesides[nextsideindex]
      nextpossiblesides.splice(nextsideindex, 1) // remove side from list
      if (nextpossiblesides.length === 0) {
        vertexMap.delete(nextvertex)
      }
      startside = nextside
    } // inner loop

    // due to the logic of fromPoints()
    // move the first point to the last
    if (connectedVertexPoints.length > 0) {
      connectedVertexPoints.push(connectedVertexPoints.shift())
    }
    outlines.push(connectedVertexPoints)
  } // outer loop
  vertexMap.clear()
  return outlines
}

module.exports = toOutlines
