const mat4 = require('../../maths/mat4')

/**
 * Transform the given geometry using the given matrix.
 * This is a lazy transform of the polygons, as this function only adjusts the transforms.
 * @param {mat4} matrix - the matrix to transform with
 * @param {geom3} geometry - the geometry to transform
 * @returns {geom3} a new geometry
 * @alias module:modeling/geometries/geom3.transform
 *
 * @example
 * let newgeometry = transform(fromXRotation(degToRad(90)), geometry)
 */
const transform = (matrix, geometry) => {
  const newgeometry = Object.assign({}, geometry)

  newgeometry.transforms = mat4.multiply(mat4.create(), matrix, geometry.transforms)
  return newgeometry
}

module.exports = transform
