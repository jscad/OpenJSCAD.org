import * as vec3 from '../../maths/vec3/index.js'

import { create } from './create.js'

/**
 * Create a slice from the given vertices.
 *
 * @param {Array} vertices - list of vertices, where each vertex is either 2D or 3D
 * @returns {slice} a new slice
 * @alias module:modeling/geometries/slice.fromVertices
 *
 * @example
 * const vertices = [
 *   [0,  0, 3],
 *   [0, 10, 3],
 *   [0, 10, 6]
 * ]
 * const slice = fromVertices(vertices)
 */
export const fromVertices = (vertices) => {
  if (!Array.isArray(vertices)) throw new Error('the given vertices must be an array')
  if (vertices.length < 3) throw new Error('the given vertices must contain THREE or more vertices')

  // Convert from 2D points to 3D vertices if needed
  const cloned = vertices.map((vertex) => {
    if (vertex.length === 3) {
      return vertex
    } else {
      return vec3.fromVec2(vec3.create(), vertex)
    }
  })
  // create a slice with one contour containing all vertices
  return create([cloned])
}
