import * as vec3 from '../../maths/vec3/index.js'

import { toVertices } from './toVertices.js'

/**
 * Create a string representing the contents of the given path.
 *
 * @param {Path3} geometry - the path
 * @returns {String} a representative string
 * @alias module:modeling/path3.toString
 *
 * @example
 * console.out(path3.toString(geometry))
 */
export const toString = (geometry) => {
  const vertices = toVertices(geometry)
  let result = 'path (' + vertices.length + ' vertices, ' + geometry.isClosed + '):\n[\n'
  vertices.forEach((vertex) => {
    result += '  ' + vec3.toString(vertex) + ',\n'
  })
  result += ']\n'
  return result
}
