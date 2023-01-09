import * as mat4 from '../../maths/mat4/index.js'
import * as vec2 from '../../maths/vec2/index.js'

import create from './create.js'

/**
 * Transform the given polygon using the given matrix.
 * @param {mat4} matrix - the matrix to transform with
 * @param {poly2} polygon - the polygon to transform
 * @returns {poly2} a new polygon
 * @alias module:modeling/geometries/poly2.transform
 */
export const transform = (matrix, polygon) => {
  const vertices = polygon.vertices.map((vertex) => vec2.transform(vec2.create(), vertex, matrix))
  if (mat4.isMirroring(matrix)) {
    // reverse the order to preserve the orientation
    vertices.reverse()
  }
  return create(vertices)
}

export default transform