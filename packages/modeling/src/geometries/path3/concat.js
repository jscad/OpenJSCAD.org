import { equals } from '../../maths/vec3/index.js'

import { fromVertices } from './fromVertices.js'
import { toVertices } from './toVertices.js'

/**
 * Concatenate the given paths.
 *
 * If both contain the same vertex at the junction, merge it into one.
 * A concatenation of zero paths is an empty, open path.
 * A concatenation of one closed path to a series of open paths produces a closed path.
 * A concatenation of a path to a closed path is an error.
 *
 * @param {...Path3} paths - the paths to concatenate
 * @returns {Path3} a new path
 * @function
 * @alias module:modeling/geometries/path3.concat
 *
 * @example
 * let newPath = concat(fromVertices({}, [[1, 2, 3]]), fromVertices({}, [[4, 5, 6]]))
 */
export const concat = (...paths) => {
  // Only the last path can be closed, producing a closed path.
  let isClosed = false
  let vertices = []
  paths.forEach((path, i) => {
    const tmp = toVertices(path).slice()
    if (vertices.length > 0 && tmp.length > 0 && equals(tmp[0], vertices[vertices.length - 1])) tmp.shift()
    if (tmp.length > 0 && isClosed) {
      throw new Error(`Cannot concatenate to a closed path; check the ${i}th path`)
    }
    isClosed = path.isClosed
    vertices = vertices.concat(tmp)
  })
  return fromVertices({ closed: isClosed }, vertices)
}
