import * as vec3 from '../../../maths/vec3/index.js'

import create from './create.js'

/**
 * Create a deep clone of the given slice.
 *
 * @param {slice} [out] - receiving slice
 * @param {slice} slice - slice to clone
 * @returns {slice} a new slice
 * @alias module:modeling/extrusions/slice.clone
 */
export const clone = (...params) => {
  let out
  let slice
  if (params.length === 1) {
    out = create()
    slice = params[0]
  } else {
    out = params[0]
    slice = params[1]
  }
  // deep clone of edges
  out.edges = slice.edges.map((edge) => [vec3.clone(edge[0]), vec3.clone(edge[1])])
  return out
}

export default clone
