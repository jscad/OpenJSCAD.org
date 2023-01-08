import * as mat4 from '../../maths/mat4/index.js'

/**
 * Transform the given geometry using the given matrix.
 * This is a lazy transform of the outlines, as this function only adjusts the transforms.
 * The transforms are applied when accessing the outlines via toOutlines().
 * @param {mat4} matrix - the matrix to transform with
 * @param {geom2} geometry - the geometry to transform
 * @returns {geom2} a new geometry
 * @alias module:modeling/geometries/geom2.transform
 *
 * @example
 * let newgeometry = transform(fromZRotation(degToRad(90)), geometry)
 */
export const transform = (matrix, geometry) => {
  const transforms = mat4.multiply(mat4.create(), matrix, geometry.transforms)
  return Object.assign({}, geometry, { transforms })
}

export default transform
