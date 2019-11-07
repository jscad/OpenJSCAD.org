const mat4 = require('../../math/mat4')
const vec3 = require('../../math/vec3')

const create = require('./create')

// Affine transformation of polygon. Returns a new Polygon3
const transform = (matrix, poly3) => {
  const vertices = poly3.vertices.map((vertex) => { return vec3.transform(matrix, vertex) })
  if (mat4.isMirroring(matrix)) {
    // reverse the order to preserve the orientation
    vertices.reverse()
  }
  return create(vertices)
}

module.exports = transform
