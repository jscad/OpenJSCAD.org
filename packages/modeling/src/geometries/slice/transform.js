import * as vec3 from '../../maths/vec3/index.js'

import { create } from './create.js'

/**
 * Transform the given slice using the given matrix.
 * @param {Mat4} matrix - transform matrix
 * @param {Slice} slice - slice to transform
 * @returns {Slice} the transformed slice
 * @alias module:modeling/geometries/slice.transform
 *
 * @example
 * let matrix = mat4.fromTranslation([1, 2, 3])
 * let newSlice = transform(matrix, oldSlice)
 */
export const transform = (matrix, slice) => {
  const contours = slice.contours.map((contour) => contour.map((vertex) => vec3.transform(vec3.create(), vertex, matrix)))
  return create(contours)
}
