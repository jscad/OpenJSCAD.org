const mat4 = require('../../math/mat4')

const create = require('./create')

/**
 * Transform the given geometry using the given matrix.
 * This is a lazy transform of the sides, as this function only adjusts the transforms.
 * The transforms are applied when accessing the sides via toSides().
 * @param {mat4} matrix - the matrix to transform with
 * @param {geom2} geometry - the geometry to transform
 * @returns {geom2} - the transformed geometry
 * @example
 * let newgeometry = transform(fromZRotation(degToRad(90)), geometry)
 */
const transform = function (matrix, geometry) {
  let newgeometry = create(geometry.sides) // reuse the sides

  newgeometry.transforms = mat4.multiply(geometry.transforms, matrix)
  return newgeometry

//  let isMirror = matrix.isMirroring()
//  let newsides = geometry.sides.map(function (side) {
//    return side.transform(matrix4x4)
//  })
//  let result = create(newsides)
//
//  if (isMirror) {
//    result = reverse(result)
//  }
//  return result
}

module.exports = transform
