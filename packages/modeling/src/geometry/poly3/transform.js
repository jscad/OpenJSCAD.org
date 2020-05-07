const mat4 = require('../../math/mat4')
const vec3 = require('../../math/vec3')

const create = require('./create')

/**
 * Transform the given polygon using the given matrix.
 * @param {mat4} matrix - the matrix to transform with
 * @param {poly3} polygon - the polygon to transform
 * @returns {poly3} a new polygon
 * @alias module:modeling/geometry/poly3.transform
 */
const transform = (matrix, poly3) => {
  const vertices = poly3.vertices.map((vertex) => { return vec3.transform(matrix, vertex) })
  if (mat4.isMirroring(matrix)) {
    // reverse the order to preserve the orientation
    vertices.reverse()
  }
  return create(vertices)
}

module.exports = transform
