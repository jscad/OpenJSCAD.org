const mat4 = require('../../maths/mat4')
const vec3 = require('../../maths/vec3')

const create = require('./create')

/**
 * Transform the given polygon using the given matrix.
 * @param {mat4} matrix - the matrix to transform with
 * @param {poly3} polygon - the polygon to transform
 * @returns {poly3} a new polygon
 * @alias module:modeling/geometries/poly3.transform
 */
const transform = (matrix, polygon) => {
  const vertices = polygon.vertices.map((vertex) => vec3.transform(vec3.create(), vertex, matrix))
  if (mat4.isMirroring(matrix)) {
    // reverse the order to preserve the orientation
    vertices.reverse()
  }
  return create(vertices)
}

module.exports = transform
