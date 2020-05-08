const vec3 = require('../../math/vec3')

const poly3 = require('../../geometry/poly3')

const slice = require('./slice')

// https://en.wikipedia.org/wiki/Greatest_common_divisor#Using_Euclid's_algorithm
const gcd = (a, b) => {
  if (a === b) { return a }
  if (a < b) { return gcd(b, a) }
  if (b === 1) { return 1 }
  if (b === 0) { return a }
  return gcd(b, a % b)
}

const lcm = (a, b) => (a * b) / gcd(a, b)

// Return a set of edges that encloses the same area by splitting
// the given edges to have newlength total edges.
const repartitionEdges = (newlength, edges) => {
  // NOTE: This implementation splits each edge evenly.
  const multiple = newlength / edges.length
  if (multiple === 1) {
    return edges
  }

  const divisor = vec3.fromValues(multiple, multiple, multiple)

  const newEdges = []
  edges.forEach((edge) => {
    const increment = vec3.divide(vec3.subtract(edge[1], edge[0]), divisor)

    // repartition the edge
    let prev = edge[0]
    for (let i = 1; i <= multiple; ++i) {
      const next = vec3.add(prev, increment)
      newEdges.push([prev, next])
      prev = next
    }
  })
  return newEdges
}

const extrudeWalls = (slice0, slice1) => {
  let edges0 = slice.toEdges(slice0)
  let edges1 = slice.toEdges(slice1)

  if (edges0.length !== edges1.length) {
    // different shapes, so adjust one or both to the same number of edges
    const newlength = lcm(edges0.length, edges1.length)
    if (newlength !== edges0.length) edges0 = repartitionEdges(newlength, edges0)
    if (newlength !== edges1.length) edges1 = repartitionEdges(newlength, edges1)
  }

  const walls = []
  edges0.forEach((edge0, i) => {
    const edge1 = edges1[i]

    const poly0 = poly3.fromPoints([edge0[0], edge0[1], edge1[1]])
    const poly1 = poly3.fromPoints([edge0[0], edge1[1], edge1[0]])

    walls.push(poly0, poly1)
  })
  return walls
}

module.exports = extrudeWalls
