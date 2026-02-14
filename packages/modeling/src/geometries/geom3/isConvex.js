const { EPS } = require('../../maths/constants')
const vec3 = require('../../maths/vec3')

const geom3 = require('./isA')
const toPolygons = require('./toPolygons')
const poly3 = require('../poly3')

/**
 * Test if a 3D geometry is convex.
 *
 * A polyhedron is convex if every vertex lies on or behind every face plane
 * (i.e., on the interior side of the plane).
 *
 * @param {geom3} geometry - the geometry to test
 * @returns {boolean} true if the geometry is convex
 * @alias module:modeling/geometries/geom3.isConvex
 *
 * @example
 * const { geom3, primitives } = require('@jscad/modeling')
 * const cube = primitives.cuboid({ size: [10, 10, 10] })
 * console.log(geom3.isConvex(cube)) // true
 */
const isConvex = (geometry) => {
  if (!geom3(geometry)) {
    throw new Error('isConvex requires a geom3 geometry')
  }

  const polygons = toPolygons(geometry)

  if (polygons.length === 0) {
    return true // Empty geometry is trivially convex
  }

  // Collect all unique vertices
  const vertices = []
  const found = new Set()
  for (let i = 0; i < polygons.length; i++) {
    const verts = polygons[i].vertices
    for (let j = 0; j < verts.length; j++) {
      const v = verts[j]
      const key = `${v[0]},${v[1]},${v[2]}`
      if (!found.has(key)) {
        found.add(key)
        vertices.push(v)
      }
    }
  }

  // For each face plane, check that all vertices are on or behind it
  for (let i = 0; i < polygons.length; i++) {
    const plane = poly3.plane(polygons[i])

    for (let j = 0; j < vertices.length; j++) {
      const v = vertices[j]
      // Distance from point to plane: dot(normal, point) - w
      const distance = vec3.dot(plane, v) - plane[3]

      // If any vertex is in front of any face (positive distance), not convex
      if (distance > EPS) {
        return false
      }
    }
  }

  return true
}

module.exports = isConvex
