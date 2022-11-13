import * as mat4 from '../../maths/mat4/index.js'
import * as vec3 from '../../maths/vec3/index.js'

import create from './create.js'

/**
 * Transform the given polygon using the given matrix.
 * @param {mat4} matrix - the matrix to transform with
 * @param {poly3} polygon - the polygon to transform
 * @returns {poly3} a new polygon
 * @alias module:modeling/geometries/poly3.transform
 */
export const transform = (matrix, polygon) => {
  const vertices = polygon.vertices.map((vertex) => vec3.transform(vec3.create(), vertex, matrix))
  if (mat4.isMirroring(matrix)) {
    // reverse the order to preserve the orientation
    vertices.reverse()
  }
  return create(vertices)
}

export default transform
