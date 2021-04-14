const create = require('./create')

/**
 * Reverse the edges of the given slice.
 *
 * @param {slice} [out] - receiving slice
 * @param {slice} slice - slice to reverse
 * @returns {slice} reverse of the slice
 * @alias module:modeling/extrusions/slice.reverse
 */
const reverse = (...params) => {
  let out
  let slice
  if (params.length === 1) {
    out = create()
    slice = params[0]
  } else {
    out = params[0]
    slice = params[1]
  }
  // reverse the edges
  out.edges = slice.edges.map((edge) => [edge[1], edge[0]])
  return out
}

module.exports = reverse
