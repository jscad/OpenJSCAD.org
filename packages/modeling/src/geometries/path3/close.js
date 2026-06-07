import { EPS } from '../../maths/constants.js'

import { distance } from '../../maths/vec3/distance.js'

/**
 * Close the given geometry.
 *
 * @param {Path3} geometry - the path to close
 * @returns {Path3} a new path
 * @alias module:modeling/path3.close
 *
 * @example
 * const newPath = path3.close(oldPath)
 */
export const close = (geometry) => {
  if (geometry.isClosed) return geometry

  const isClosed = true
  const vertices = geometry.vertices.slice()
  if (vertices.length > 1) {
    // make sure the paths are formed properly
    const p0 = vertices[0]
    let pn = vertices[vertices.length - 1]
    while (distance(p0, pn) < EPS) {
      vertices.pop()
      if (vertices.length === 1) break
      pn = vertices[vertices.length - 1]
    }
  }
  // use Object.assign in order to assign EXTRA attributes like color, name, etc
  return Object.assign({}, geometry, { isClosed, vertices })
}
