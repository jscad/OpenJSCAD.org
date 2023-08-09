import * as vec2 from '../../maths/vec2/index.js'

import { create } from './create.js'

/*
 * Create a list of edges which SHARE points.
 * This allows the edges to be traversed in order.
 */
const toSharedPoints = (sides) => {
  const unique = new Map() // {key: point}
  const getUniquePoint = (point) => {
    const key = point.toString()
    if (unique.has(key)) {
      return unique.get(key)
    } else {
      unique.set(key, point)
      return point
    }
  }

  return sides.map((side) => side.map(getUniquePoint))
}

/*
 * Convert a list of sides into a map from point to edges.
 */
const toPointMap = (sides) => {
  const pointMap = new Map()
  // first map to edges with shared vertices
  const edges = toSharedPoints(sides)
  // construct adjacent edges map
  edges.forEach((edge) => {
    if (pointMap.has(edge[0])) {
      pointMap.get(edge[0]).push(edge)
    } else {
      pointMap.set(edge[0], [edge])
    }
  })
  return pointMap
}

/**
 * Create a new 2D geometry from a list of sides.
 * @param {Array} sides - list of sides to create outlines from
 * @returns {Geom2} a new geometry
 *
 * @example
 * let geometry = fromSides([[[0, 0], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [0, 0]]])
 */
export const fromSides = (sides) => {
  const pointMap = toPointMap(sides) // {point: [edges]}
  const outlines = []
  while (true) {
    let startSide
    for (const [point, edges] of pointMap) {
      startSide = edges.shift()
      if (!startSide) {
        pointMap.delete(point)
        continue
      }
      break
    }
    if (startSide === undefined) break // all starting sides have been visited

    const connectedPoints = []
    const startPoint = startSide[0]
    while (true) {
      connectedPoints.push(startSide[0])
      const nextPoint = startSide[1]
      if (nextPoint === startPoint) break // the outline has been closed
      const nextPossibleSides = pointMap.get(nextPoint)
      if (!nextPossibleSides) {
        throw new Error(`geometry is not closed at point ${nextPoint}`)
      }
      const nextSide = popNextSide(startSide, nextPossibleSides)
      if (nextPossibleSides.length === 0) {
        pointMap.delete(nextPoint)
      }
      startSide = nextSide
    } // inner loop

    // due to the logic of fromPoints()
    // move the first point to the last
    if (connectedPoints.length > 0) {
      connectedPoints.push(connectedPoints.shift())
    }
    outlines.push(connectedPoints)
  } // outer loop
  pointMap.clear()
  return create(outlines)
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
