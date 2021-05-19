const mat4 = require('../../maths/mat4')

const create = require('./create')

/**
 * Transform the given geometry using the given matrix.
 * This is a lazy transform of the polygons, as this function only adjusts the transforms.
 * See applyTransforms() for the actual application of the transforms to the polygons.
 * @param {mat4} matrix - the matrix to transform with
 * @param {geom3} geometry - the geometry to transform
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.transform
 *
 * @example
 * let newgeometry = transform(fromXRotation(degToRad(90)), geometry)
 */
const transform = (matrix, geometry) => {
  const newgeometry = create(geometry.polygons) // reuse the polygons
  newgeometry.isRetesselated = geometry.isRetesselated

  mat4.multiply(newgeometry.transforms, matrix, geometry.transforms)
  return newgeometry
}

module.exports = transform
