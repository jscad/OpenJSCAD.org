const mat4 = require('../../math/mat4')
const vert3 = require('')
const plane = require('')
const fromData = require('./fromData')

// Affine transformation of polygon. Returns a new Polygon3
const transform = (matrix, poly3) => {
  const newvertices = poly3.vertices.map(vertex => vert3.transform(matrix, vertex))
  const newplane = plane.transform(matrix, poly3.plane)
  if (mat4.isMirroring(matrix)) {
        // need to reverse the vertex order
        // in order to preserve the inside/outside orientation:
    newvertices.reverse()
  }
  return fromData(newvertices, poly3.shared, newplane)
}

module.exports = transform
