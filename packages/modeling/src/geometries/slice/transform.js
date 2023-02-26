import * as vec3 from '../../maths/vec3/index.js'

import { create } from './create.js'

/**
 * Transform the given slice using the given matrix.
 * @param {mat4} matrix - transform matrix
 * @param {slice} slice - slice to transform
 * @returns {slice} the transformed slice
 * @alias module:modeling/geometries/slice.transform
 *
 * @example
 * let matrix = mat4.fromTranslation([1, 2, 3])
 * let newSlice = transform(matrix, oldSlice)
 */
export const transform = (matrix, slice) => {
  const contours = slice.contours.map((contour) => contour.map((point) => vec3.transform(vec3.create(), point, matrix)))
  return create(contours)
}
