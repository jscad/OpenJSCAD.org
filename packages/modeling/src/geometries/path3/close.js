import { EPS } from '../../maths/constants.js'

import * as vec3 from '../../maths/vec3/index.js'

/**
 * Close the given geometry.
 *
 * @param {Path3} geometry - the path to close
 * @returns {Path3} a new path
 * @function
 * @alias module:modeling/geometries/path3.close
 */
export const close = (geometry) => {
  if (geometry.isClosed) return geometry

  const cloned = Object.assign({}, geometry)
  cloned.isClosed = true

  if (cloned.vertices.length > 1) {
    // make sure the paths are formed properly
    const vertices = cloned.vertices
    const p0 = vertices[0]
    let pn = vertices[vertices.length - 1]
    while (vec3.distance(p0, pn) < (EPS * EPS)) {
      vertices.pop()
      if (vertices.length === 1) break
      pn = vertices[vertices.length - 1]
    }
  }
  return cloned
}
