const mat4 = require('../../math/mat4')

const create = require('./create')

/**
 * A lazy transform of all of the points in the path.
 * @param {mat4} matrix - the matrix to transform with
 * @param {path2} geometry - the path to transform
 * @returns {path2} - the transformed path
 * @example
 * transform(fromZRotation(degToRad(90)), path)
 */
const transform = (matrix, geometry) => {
  let newgeometry = create(geometry.points) // reuse the points
  newgeometry.isClosed = geometry.isClosed

  newgeometry.transforms = mat4.multiply(geometry.transforms, matrix)
  return newgeometry
}

module.exports = transform
