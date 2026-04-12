import * as mat4 from '../../maths/mat4/index.js'

/**
 * Transform the given geometry using the given matrix.
 *
 * This is a lazy transform of the vertices, as this function only adjusts the transforms.
 * The transforms are applied when accessing the vertices via toVertices().
 *
 * @param {Mat4} matrix - the matrix to transform with
 * @param {Path3} geometry - the geometry to transform
 * @returns {Path3} a new path
 * @alias module:modeling/path3.transform
 *
 * @example
 * let newPath = path3.transform(mat4.fromZRotation(TAU / 8), oldPath)
 */
export const transform = (matrix, geometry) => {
  const transforms = mat4.multiply(mat4.create(), matrix, geometry.transforms)
  return Object.assign({}, geometry, { transforms })
}
