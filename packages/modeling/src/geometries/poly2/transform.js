const mat4 = require('../../maths/mat4')
const vec2 = require('../../maths/vec2')

const create = require('./create')

/**
 * Transform the given polygon using the given matrix.
 * @param {mat4} matrix - the matrix to transform with
 * @param {poly2} polygon - the polygon to transform
 * @returns {poly2} a new polygon
 * @alias module:modeling/geometries/poly2.transform
 */
const transform = (matrix, polygon) => {
  const vertices = polygon.vertices.map((vertex) => vec2.transform(vec2.create(), vertex, matrix))
  if (mat4.isMirroring(matrix)) {
    // reverse the order to preserve the orientation
    vertices.reverse()
  }
  return create(vertices)
}

module.exports = transform
