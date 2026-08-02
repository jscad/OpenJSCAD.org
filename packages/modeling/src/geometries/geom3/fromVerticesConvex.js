import { runner } from '../../operations/hulls/quickhull/index.js'
import { create } from './create.js'
import * as poly3 from '../poly3/index.js'

/**
 * Construct a new 3D geometry from a list of unique vertices.
 *
 * The unique vertices are used to create a hull of the vertices.
 *
 * @param {Array} uniqueVertices - list of vertices to construct convex 3D geometry
 * @returns {Geom3} a new geometry
 * @alias module:modeling/geom3.fromVerticesConvex
 */
export const fromVerticesConvex = (uniqueVertices) => {
  if (!Array.isArray(uniqueVertices)) {
    throw new Error('the given vertices must be an array')
  }

  const faces = runner(uniqueVertices, { skipTriangulation: true })

  const polygons = faces.map((face) => {
    const vertices = face.map((index) => uniqueVertices[index])
    return poly3.create(vertices)
  })

  return create(polygons)
}
