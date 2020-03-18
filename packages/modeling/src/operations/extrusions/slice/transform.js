const vec3 = require('../../../math/vec3')

const create = require('./create')

/**
 * Transform the given slice using the given matrix.
 * @param {mat4} matrix - transform matrix
 * @param {slice} slice - slice to transform
 * @returns {slice} the transformed slice
 */
const transform = (matrix, slice) => {
  const edges = slice.edges.map((edge) => [vec3.transform(matrix, edge[0]), vec3.transform(matrix, edge[1])])
  return create(edges)
}

module.exports = transform
