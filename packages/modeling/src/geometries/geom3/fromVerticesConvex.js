import { runner } from '../../operations/hulls/quickhull/index.js'
import { create } from './create.js'
import * as poly3 from '../poly3/index.js'

/**
 * Construct a new convex 3D geometry from a list of unique vertices.
 *
 * @param {Array} uniqueVertices - list of vertices to construct convex 3D geometry
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.fromVerticesConvex
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
