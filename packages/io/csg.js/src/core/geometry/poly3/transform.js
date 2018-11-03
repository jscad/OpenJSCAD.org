const create = require('./create')

const plane = require('../../math/plane/')
const vec3 = require('../../math/vec3')

const mat4 = require('../../math/mat4')

// Affine transformation of polygon. Returns a new Polygon3
const transform = (matrix, poly3) => {
  const vertices = poly3.vertices.map((vertex) => { return vec3.transformMat4(matrix, vertex) })
  if (mat4.isMirroring(matrix)) {
    // reverse the order to preserve the orientation
    vertices.reverse()
  }
  const out = create()
  out.vertices = vertices
  out.plane = plane.transformMat4(matrix, poly3.plane)
  return out
}

module.exports = transform
