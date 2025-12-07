import * as vec3 from '../../maths/vec3/index.js'

import { toVertices } from './toVertices.js'

/**
 * Create a string representing the contents of the given path.
 *
 * @param {path} geometry - the path
 * @returns {string} a representative string
 * @function
 * @alias module:modeling/geometries/path3.toString
 *
 * @example
 * console.out(toString(path))
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
