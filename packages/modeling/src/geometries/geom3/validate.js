const poly3 = require('../poly3')
const isA = require('./isA')

/**
 * Determine if the given object is a valid 3D geometry.
 * Checks for valid data structure, convex polygon faces, and manifold edges.
 *
 * **If the geometry is not valid, an exception will be thrown with details of the geometry error.**
 *
 * @param {Object} object - the object to interrogate
 * @throws {Error} error if the geometry is not valid
 * @alias module:modeling/geometries/geom3.validate
 */
const validate = (object) => {
  if (!isA(object)) {
    throw new Error('invalid geom3 structure')
  }

  // check polygons
  object.polygons.forEach(poly3.validate)
  validateManifold(object)

  // check transforms
  if (!object.transforms.every(Number.isFinite)) {
    throw new Error(`geom3 invalid transforms ${object.transforms}`)
  }

  // TODO: check for self-intersecting
}

/*
 * Check manifold edge condition: Every edge is in exactly 2 faces
 */
const validateManifold = (object) => {
  // count of each edge
  const edgeCount = new Map()
  object.polygons.forEach(({ vertices }) => {
    vertices.forEach((v, i) => {
      const v1 = `${v}`
      const v2 = `${vertices[(i + 1) % vertices.length]}`
      // sort for undirected edge
      const edge = `${v1}/${v2}`
      const count = edgeCount.has(edge) ? edgeCount.get(edge) : 0
      edgeCount.set(edge, count + 1)
    })
  })

  // check that edges are always matched
  const nonManifold = []
  edgeCount.forEach((count, edge) => {
    const complementEdge = edge.split('/').reverse().join('/')
    const complementCount = edgeCount.get(complementEdge)
    if (count !== complementCount) {
      nonManifold.push(edge.replace('/', ' -> '))
    }
  })
  if (nonManifold.length > 0) {
    throw new Error(`non-manifold edges ${nonManifold.length}\n${nonManifold.join('\n')}`)
  }
}

module.exports = validate
