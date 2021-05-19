const mat4 = require('../../maths/mat4')

const create = require('./create')

/**
 * Transform the given geometry using the given matrix.
 * This is a lazy transform of the points, as this function only adjusts the transforms.
 * The transforms are applied when accessing the points via toPoints().
 * @param {mat4} matrix - the matrix to transform with
 * @param {path2} geometry - the geometry to transform
 * @returns {path2} a new path
 * @alias module:modeling/geometries/path2.transform
 *
 * @example
 * let newpath = transform(fromZRotation(Math.PI / 4), path)
 */
const transform = (matrix, geometry) => {
  const newgeometry = create(geometry.points) // reuse the points
  newgeometry.isClosed = geometry.isClosed

  mat4.multiply(newgeometry.transforms, matrix, geometry.transforms)
  return newgeometry
}

module.exports = transform
