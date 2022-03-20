const { filterPoints, linkedPolygon, locallyInside, splitPolygon } = require('./linkedPolygon')
const { area, pointInTriangle } = require('./triangle')

/*
 * link every hole into the outer loop, producing a single-ring polygon without holes
 *
 * Original source from https://github.com/mapbox/earcut
 * Copyright (c) 2016 Mapbox
 */
const eliminateHoles = (data, holeIndices, outerNode, dim) => {
  const queue = []

  for (let i = 0, len = holeIndices.length; i < len; i++) {
    const start = holeIndices[i] * dim
    const end = i < len - 1 ? holeIndices[i + 1] * dim : data.length
    const list = linkedPolygon(data, start, end, dim, false)
    if (list === list.next) list.steiner = true
    queue.push(getLeftmost(list))
  }

  queue.sort((a, b) => a.x - b.x) // compare X

  // process holes from left to right
  for (let i = 0; i < queue.length; i++) {
    outerNode = eliminateHole(queue[i], outerNode)
    outerNode = filterPoints(outerNode, outerNode.next)
  }

  return outerNode
}

/*
 * find a bridge between vertices that connects hole with an outer ring and link it
 */
const eliminateHole = (hole, outerNode) => {
  const bridge = findHoleBridge(hole, outerNode)
  if (!bridge) {
    return outerNode
  }

  const bridgeReverse = splitPolygon(bridge, hole)

  // filter colinear points around the cuts
  const filteredBridge = filterPoints(bridge, bridge.next)
  filterPoints(bridgeReverse, bridgeReverse.next)

  // Check if input node was removed by the filtering
  return outerNode === bridge ? filteredBridge : outerNode
}

/*
 * David Eberly's algorithm for finding a bridge between hole and outer polygon
 */
const findHoleBridge = (hole, outerNode) => {
  let p = outerNode
  const hx = hole.x
  const hy = hole.y
  let qx = -Infinity
  let m

  // find a segment intersected by a ray from the hole's leftmost point to the left
  // segment's endpoint with lesser x will be potential connection point
  do {
    if (hy <= p.y && hy >= p.next.y && p.next.y !== p.y) {
      const x = p.x + (hy - p.y) * (p.next.x - p.x) / (p.next.y - p.y)
      if (x <= hx && x > qx) {
        qx = x
        if (x === hx) {
          if (hy === p.y) return p
          if (hy === p.next.y) return p.next
        }

        m = p.x < p.next.x ? p : p.next
      }
    }

    p = p.next
  } while (p !== outerNode)

  if (!m) return null

  if (hx === qx) return m // hole touches outer segment; pick leftmost endpoint

  // look for points inside the triangle of hole point, segment intersection and endpoint
  // if there are no points found, we have a valid connection
  // otherwise choose the point of the minimum angle with the ray as connection point

  const stop = m
  const mx = m.x
  const my = m.y
  let tanMin = Infinity

  p = m

  do {
    if (hx >= p.x && p.x >= mx && hx !== p.x &&
        pointInTriangle(hy < my ? hx : qx, hy, mx, my, hy < my ? qx : hx, hy, p.x, p.y)) {
      const tan = Math.abs(hy - p.y) / (hx - p.x) // tangential

      if (locallyInside(p, hole) && (tan < tanMin || (tan === tanMin && (p.x > m.x || (p.x === m.x && sectorContainsSector(m, p)))))) {
        m = p
        tanMin = tan
      }
    }

    p = p.next
  } while (p !== stop)

  return m
}

/*
 * whether sector in vertex m contains sector in vertex p in the same coordinates
 */
const sectorContainsSector = (m, p) => area(m.prev, m, p.prev) < 0 && area(p.next, m, m.next) < 0

/*
 * find the leftmost node of a polygon ring
 */
const getLeftmost = (start) => {
  let p = start
  let leftmost = start
  do {
    if (p.x < leftmost.x || (p.x === leftmost.x && p.y < leftmost.y)) leftmost = p
    p = p.next
  } while (p !== start)

  return leftmost
}

module.exports = eliminateHoles
