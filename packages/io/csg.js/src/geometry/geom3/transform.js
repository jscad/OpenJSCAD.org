const mat4 = require('../../math/mat4')

const create = require('./create')

/**
 * Transform the given geometry using the given matrix.
 * This is a lazy transform of the polygons, as this function only adjusts the transforms.
 * See applyTransforms() for the actual application of the transforms to the polygons.
 * @param {Matrix4x4} matrix - the matrix to transform with
 * @param {geom3} geometry - the geometry to transform
 * @returns {geom3} - the transformed geometry
 * @example
 * let newgeometry = transform(fromXRotation(degToRad(90)), geometry)
 */
const transform = function (matrix, geometry) {
  let newgeometry = create(geometry.polygons) // reuse the polygons
  newgeometry.isRetesselated = geometry.isRetesselated

  newgeometry.transforms = mat4.multiply(geometry.transforms, matrix)
  return newgeometry
}

module.exports = transform
