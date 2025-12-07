import { EPS } from '../../maths/constants.js'

import * as vec3 from '../../maths/vec3/index.js'

import { close } from './close.js'
import { create } from './create.js'

/**
 * Create a new path from the given vertices.
 *
 * The vertices must be provided as an array of vertices,
 * where each vertex is an array of three numbers.
 *
 * @param {Object} options - options for construction
 * @param {boolean} [options.closed=false] - if the path should be open or closed
 * @param {Array} vertices - array of vertices (3D) from which to create the path
 * @returns {Path3} a new path
 * @function
 * @alias module:modeling/geometries/path3.fromVertices
 *
 * @example
 * my newPath = fromVertices({closed: true}, [[10, 10, 10], [-10, 10, -10]])
 */
export const fromVertices = (options, vertices) => {
  const defaults = { closed: false }
  let { closed } = Object.assign({}, defaults, options)

  let created = create()
  // FIXME why clone vertices?
  created.vertices = vertices.map((vertex) => vec3.clone(vertex))

  // check if first and last vertices are equal
  if (created.vertices.length > 1) {
    const p0 = created.vertices[0]
    const pn = created.vertices[created.vertices.length - 1]
    // FIXME correct EPS
    if (vec3.distance(p0, pn) < (EPS * EPS)) {
      // and close automatically
      closed = true
    }
  }
  if (closed === true) created = close(created)

  return created
}
