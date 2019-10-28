const {vec2} = require('../../math')

const toSides = require('./toSides')

/*
 * Create a list of edges which SHARE vertices.
 * This allows the edges to be traversed in order.
 */
const toEdges = (sides) => {
  let uniquevertices = []
  const getUniqueVertex = (vertex) => {
    let i = uniquevertices.findIndex((v) => {
      return vec2.equals(v, vertex)
    })
    if (i < 0) {
      uniquevertices.push(vertex)
      return vertex
    }
    return uniquevertices[i]
  }

  let edges = []
  sides.forEach((side) => {
    edges.push([getUniqueVertex(side[0]), getUniqueVertex(side[1])])
  })
  return edges
}

/**
 * Create the outline(s) of the given geometry.
 * @param  {geom2} geometry
 * @returns {Array} an array of outlines, where each outline is an array of ordered points
 * @example
 * let geometry = subtract(rectangle({size: [5, 5]}), rectangle({size: [3, 3]}))
 * let outlines = toOutlines(geometry) // returns two outlines
 */
const toOutlines = (geometry) => {
  let vertexMap = new Map()
  let edges = toEdges(toSides(geometry))
  edges.forEach((edge) => {
    if (!(vertexMap.has(edge[0]))) {
      vertexMap.set(edge[0], [])
    }
    let sideslist = vertexMap.get(edge[0])
    sideslist.push(edge)
  })

  let outlines = []
  while (true) {
    let startside = undefined
    for (let [vertex, edges] of vertexMap) {
      startside = edges.shift()
      if (!startside) {
        vertexMap.delete(vertex)
        continue
      }
      break
    }
    if (startside === undefined) break // all starting sides have been visited

    let connectedVertexPoints = []
    let startvertex = startside[0]
    while (true) {
      connectedVertexPoints.push(startside[0])
      let nextvertex = startside[1]
      if (nextvertex === startvertex) break // the outline has been closed
      let nextpossiblesides = vertexMap.get(nextvertex)
      if (!nextpossiblesides) {
        throw new Error('the given geometry is not closed. verify proper construction')
      }
      let nextsideindex = -1
      if (nextpossiblesides.length === 1) {
        nextsideindex = 0
      } else {
        // more than one side starting at the same vertex
        let bestangle = undefined
        let startangle = vec2.angleDegrees(vec2.subtract(startside[1], startside[0]))
        for (let sideindex = 0; sideindex < nextpossiblesides.length; sideindex++) {
          let nextpossibleside = nextpossiblesides[sideindex]
          let nextangle = vec2.angleDegrees(vec2.subtract(nextpossibleside[1], nextpossibleside[0]))
          let angledif = nextangle - startangle
          if (angledif < -180) angledif += 360
          if (angledif >= 180) angledif -= 360
          if ((nextsideindex < 0) || (angledif > bestangle)) {
            nextsideindex = sideindex
            bestangle = angledif
          }
        }
      }
      let nextside = nextpossiblesides[nextsideindex]
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
