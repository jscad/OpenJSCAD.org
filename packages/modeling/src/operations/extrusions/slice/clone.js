const create = require('./create')

const vec3 = require('../../../math/vec3')

/**
 * Create a deep clone of the given slice.
 *
 * @param {vec3} [out] - receiving slice
 * @param {vec3} slice - slice to clone
 * @returns {vec3} clone of the slice
 */
const clone = (...params) => {
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

module.exports = clone
