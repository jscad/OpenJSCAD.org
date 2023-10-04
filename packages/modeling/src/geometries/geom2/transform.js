const mat4 = require('../../maths/mat4')

const reverse = require('./reverse.js')

/**
 * Transform the given geometry using the given matrix.
 * This is a lazy transform of the sides, as this function only adjusts the transforms.
 * The transforms are applied when accessing the sides via toSides().
 * @param {mat4} matrix - the matrix to transform with
 * @param {geom2} geometry - the geometry to transform
 * @returns {geom2} a new geometry
 * @alias module:modeling/geometries/geom2.transform
 *
 * @example
 * let newgeometry = transform(fromZRotation(degToRad(90)), geometry)
 */
const transform = (matrix, geometry) => {
  const transforms = mat4.multiply(mat4.create(), matrix, geometry.transforms)
  const transformed = Object.assign({}, geometry, { transforms })
  // determine if the transform is mirroring in 2D
  if (matrix[0] * matrix[5] - matrix[4] * matrix[1] < 0) {
    // reverse the order to preserve the orientation
    return reverse(transformed)
  }
  return transformed
}

module.exports = transform
