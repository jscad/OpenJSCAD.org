import * as vec3 from '../../maths/vec3/index.js'

import create from './create.js'

/**
 * Create a deep clone of the given polygon
 *
 * @param {poly3} [out] - receiving polygon
 * @param {poly3} polygon - polygon to clone
 * @returns {poly3} a new polygon
 * @alias module:modeling/geometries/poly3.clone
 */
export const clone = (...params) => {
  let out
  let poly3
  if (params.length === 1) {
    out = create()
    poly3 = params[0]
  } else {
    out = params[0]
    poly3 = params[1]
  }
  // deep clone of vertices
  out.vertices = poly3.vertices.map((vec) => vec3.clone(vec))
  return out
}
