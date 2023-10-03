import * as mat4 from '../../maths/mat4/index.js'

import { reverse } from './reverse.js'

/**
 * Transform the given geometry using the given matrix.
 * This is a lazy transform of the outlines, as this function only adjusts the transforms.
 * The transforms are applied when accessing the outlines via toOutlines().
 * @param {Mat4} matrix - the matrix to transform with
 * @param {Geom2} geometry - the geometry to transform
 * @returns {Geom2} a new geometry
 * @alias module:modeling/geometries/geom2.transform
 *
 * @example
 * let newGeometry = transform(fromZRotation(TAU / 4), geometry)
 */
export const transform = (matrix, geometry) => {
  const transforms = mat4.multiply(mat4.create(), matrix, geometry.transforms)
  const transformed = Object.assign({}, geometry, { transforms })
  // 2D determinant
  if (matrix[0] * matrix[5] - matrix[4] * matrix[1] < 0) {
    // reverse the order to preserve the orientation
    return reverse(transformed)
  }
  return transformed
}
