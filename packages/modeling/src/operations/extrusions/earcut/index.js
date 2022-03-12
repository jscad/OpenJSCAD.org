const eliminateHoles = require('./eliminateHoles')
const { removeNode, sortLinked } = require('./linkedList')
const { cureLocalIntersections, filterPoints, isValidDiagonal, linkedPolygon, splitPolygon } = require('./linkedPolygon')
const { area, pointInTriangle } = require('./triangle')

/*
 * An implementation of the earcut polygon triangulation algorithm.
 *
 * Original source from https://github.com/mapbox/earcut
 * Copyright (c) 2016 Mapbox
 *
 * @param {data} A flat array of vertex coordinates.
 * @param {holeIndices} An array of hole indices if any.
 * @param {dim} The number of coordinates per vertex in the input array.
 */
const triangulate = (data, holeIndices, dim = 2) => {
  const hasHoles = holeIndices && holeIndices.length
  const outerLen = hasHoles ? holeIndices[0] * dim : data.length
  let outerNode = linkedPolygon(data, 0, outerLen, dim, true)
  const triangles = []

  if (!outerNode || outerNode.next === outerNode.prev) return triangles

  let minX, minY, maxX, maxY, invSize

  if (hasHoles) outerNode = eliminateHoles(data, holeIndices, outerNode, dim)

  // if the shape is not too simple, we'll use z-order curve hash later; calculate polygon bbox
  if (data.length > 80 * dim) {
    minX = maxX = data[0]
    minY = maxY = data[1]

    for (let i = dim; i < outerLen; i += dim) {
      const x = data[i]
      const y = data[i + 1]
      if (x < minX) minX = x
      if (y < minY) minY = y
      if (x > maxX) maxX = x
      if (y > maxY) maxY = y
    }

    // minX, minY and invSize are later used to transform coords into integers for z-order calculation
    invSize = Math.max(maxX - minX, maxY - minY)
    invSize = invSize !== 0 ? 1 / invSize : 0
  }

  earcutLinked(outerNode, triangles, dim, minX, minY, invSize)

  return triangles
}

/*
 * main ear slicing loop which triangulates a polygon (given as a linked list)
 */
const earcutLinked = (ear, triangles, dim, minX, minY, invSize, pass) => {
  if (!ear) return

  // interlink polygon nodes in z-order
  if (!pass && invSize) indexCurve(ear, minX, minY, invSize)

  let stop = ear
  let prev
  let next

  // iterate through ears, slicing them one by one
  while (ear.prev !== ear.next) {
    prev = ear.prev
    next = ear.next

    if (invSize ? isEarHashed(ear, minX, minY, invSize) : isEar(ear)) {
      // cut off the triangle
      triangles.push(prev.i / dim)
      triangles.push(ear.i / dim)
      triangles.push(next.i / dim)

      removeNode(ear)

      // skipping the next vertex leads to less sliver triangles
      ear = next.next
      stop = next.next

      continue
    }

    ear = next

    // if we looped through the whole remaining polygon and can't find any more ears
    if (ear === stop) {
      // try filtering points and slicing again
      if (!pass) {
        earcutLinked(filterPoints(ear), triangles, dim, minX, minY, invSize, 1)

        // if this didn't work, try curing all small self-intersections locally
      } else if (pass === 1) {
        ear = cureLocalIntersections(filterPoints(ear), triangles, dim)
        earcutLinked(ear, triangles, dim, minX, minY, invSize, 2)

        // as a last resort, try splitting the remaining polygon into two
      } else if (pass === 2) {
        splitEarcut(ear, triangles, dim, minX, minY, invSize)
      }

      break
    }
  }
}

/*
 * check whether a polygon node forms a valid ear with adjacent nodes
 */
const isEar = (ear) => {
  const a = ear.prev
  const b = ear
  const c = ear.next

  if (area(a, b, c) >= 0) return false // reflex, can't be an ear

  // now make sure we don't have other points inside the potential ear
  let p = ear.next.next

  while (p !== ear.prev) {
    if (pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) && area(p.prev, p, p.next) >= 0) {
      return false
    }
    p = p.next
  }

  return true
}

const isEarHashed = (ear, minX, minY, invSize) => {
  const a = ear.prev
  const b = ear
  const c = ear.next

  if (area(a, b, c) >= 0) return false // reflex, can't be an ear

  // triangle bbox; min & max are calculated like this for speed
  const minTX = a.x < b.x ? (a.x < c.x ? a.x : c.x) : (b.x < c.x ? b.x : c.x)
  const minTY = a.y < b.y ? (a.y < c.y ? a.y : c.y) : (b.y < c.y ? b.y : c.y)
  const maxTX = a.x > b.x ? (a.x > c.x ? a.x : c.x) : (b.x > c.x ? b.x : c.x)
  const maxTY = a.y > b.y ? (a.y > c.y ? a.y : c.y) : (b.y > c.y ? b.y : c.y)

  // z-order range for the current triangle bbox
  const minZ = zOrder(minTX, minTY, minX, minY, invSize)
  const maxZ = zOrder(maxTX, maxTY, minX, minY, invSize)

  let p = ear.prevZ
  let n = ear.nextZ

  // look for points inside the triangle in both directions
  while (p && p.z >= minZ && n && n.z <= maxZ) {
    if (p !== ear.prev && p !== ear.next &&
      pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
      area(p.prev, p, p.next) >= 0) return false
    p = p.prevZ

    if (n !== ear.prev && n !== ear.next &&
      pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
      area(n.prev, n, n.next) >= 0) return false
    n = n.nextZ
  }

  // look for remaining points in decreasing z-order
  while (p && p.z >= minZ) {
    if (p !== ear.prev && p !== ear.next &&
      pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, p.x, p.y) &&
      area(p.prev, p, p.next) >= 0) return false
    p = p.prevZ
  }

  // look for remaining points in increasing z-order
  while (n && n.z <= maxZ) {
    if (n !== ear.prev && n !== ear.next &&
      pointInTriangle(a.x, a.y, b.x, b.y, c.x, c.y, n.x, n.y) &&
      area(n.prev, n, n.next) >= 0) return false
    n = n.nextZ
  }

  return true
}

/*
 * try splitting polygon into two and triangulate them independently
 */
const splitEarcut = (start, triangles, dim, minX, minY, invSize) => {
  // look for a valid diagonal that divides the polygon into two
  let a = start
  do {
    let b = a.next.next
    while (b !== a.prev) {
      if (a.i !== b.i && isValidDiagonal(a, b)) {
        // split the polygon in two by the diagonal
        let c = splitPolygon(a, b)

        // filter colinear points around the cuts
        a = filterPoints(a, a.next)
        c = filterPoints(c, c.next)

        // run earcut on each half
        earcutLinked(a, triangles, dim, minX, minY, invSize)
        earcutLinked(c, triangles, dim, minX, minY, invSize)
        return
      }

      b = b.next
    }

    a = a.next
  } while (a !== start)
}

/*
 * interlink polygon nodes in z-order
 */
const indexCurve = (start, minX, minY, invSize) => {
  let p = start
  do {
    if (p.z === null) p.z = zOrder(p.x, p.y, minX, minY, invSize)
    p.prevZ = p.prev
    p.nextZ = p.next
    p = p.next
  } while (p !== start)

  p.prevZ.nextZ = null
  p.prevZ = null

  sortLinked(p, (p) => p.z)
}

/*
 * z-order of a point given coords and inverse of the longer side of data bbox
 */
const zOrder = (x, y, minX, minY, invSize) => {
  // coords are transformed into non-negative 15-bit integer range
  x = 32767 * (x - minX) * invSize
  y = 32767 * (y - minY) * invSize

  x = (x | (x << 8)) & 0x00FF00FF
  x = (x | (x << 4)) & 0x0F0F0F0F
  x = (x | (x << 2)) & 0x33333333
  x = (x | (x << 1)) & 0x55555555

  y = (y | (y << 8)) & 0x00FF00FF
  y = (y | (y << 4)) & 0x0F0F0F0F
  y = (y | (y << 2)) & 0x33333333
  y = (y | (y << 1)) & 0x55555555

  return x | (y << 1)
}

module.exports = triangulate
