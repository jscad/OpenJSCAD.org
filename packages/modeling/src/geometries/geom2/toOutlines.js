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
 * @param {geom2} geometry - geometry to create outlines from
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
    let startSide
    for (const [vertex, edges] of vertexMap) {
      startSide = edges.shift()
      if (!startSide) {
        vertexMap.delete(vertex)
        continue
      }
      break
    }
    if (startSide === undefined) break // all starting sides have been visited

    const connectedVertexPoints = []
    const startVertex = startSide[0]
    while (true) {
      connectedVertexPoints.push(startSide[0])
      const nextVertex = startSide[1]
      if (nextVertex === startVertex) break // the outline has been closed
      const nextPossibleSides = vertexMap.get(nextVertex)
      if (!nextPossibleSides) {
        throw new Error(`geometry is not closed at vertex ${nextVertex}`)
      }
      const nextSide = popNextSide(startSide, nextPossibleSides)
      if (nextPossibleSides.length === 0) {
        vertexMap.delete(nextVertex)
      }
      startSide = nextSide
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

// find the first counter-clockwise edge from startSide and pop from nextSides
const popNextSide = (startSide, nextSides) => {
  if (nextSides.length === 1) {
    return nextSides.pop()
  }
  const v0 = vec2.create()
  const startAngle = vec2.angleDegrees(vec2.subtract(v0, startSide[1], startSide[0]))
  let bestAngle
  let bestIndex
  nextSides.forEach((nextSide, index) => {
    const nextAngle = vec2.angleDegrees(vec2.subtract(v0, nextSide[1], nextSide[0]))
    let angle = nextAngle - startAngle
    if (angle < -180) angle += 360
    if (angle >= 180) angle -= 360
    if (bestIndex === undefined || angle > bestAngle) {
      bestIndex = index
      bestAngle = angle
    }
  })
  const nextSide = nextSides[bestIndex]
  nextSides.splice(bestIndex, 1) // remove side from list
  return nextSide
}

module.exports = toOutlines
