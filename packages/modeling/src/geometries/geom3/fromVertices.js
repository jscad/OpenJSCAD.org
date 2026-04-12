import * as poly3 from '../poly3/index.js'

import { create } from './create.js'

/**
 * Construct a new 3D geometry from a list of vertices.
 *
 * The list of vertices should contain sub-arrays, each defining a single polygon of vertices.
 * In addition, the vertices should follow the right-hand rule for rotation in order to
 * define an external facing polygon.
 *
 * @param {Array} listOfLists - list of lists, where each list is a set of vertices to construct a polygon
 * @returns {Geom3} a new geometry
 * @alias module:modeling/geom3.fromVertices
 *
 * @example
 * let vertices = [
 *   [[-1,-1,-1], [-1,-1,1], [-1,1,1], [-1,1,-1]],
 *   [[1,-1,-1], [1,1,-1], [1,1,1], [1,-1,1]],
 *   [[-1,-1,-1], [1,-1,-1], [1,-1,1], [-1,-1,1]]
 *   [[-1,1,-1], [-1,1,1], [1,1,1], [1,1,-1]],
 *   [[-1,-1,-1], [-1,1,-1], [1,1,-1], [1,-1,-1]],
 *   [[-1,-1,1], [1,-1,1], [1,1,1], [-1,1,1]]
 * ]
 * let geometry = geom3.fromVertices(vertices)
 */
export const fromVertices = (listOfLists) => {
  if (!Array.isArray(listOfLists)) {
    throw new Error('the given vertices must be an array')
  }

  return create(listOfLists.map(poly3.create))
}
