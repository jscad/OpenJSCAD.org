import { equals } from '../../maths/vec2/index.js'

import { fromPoints } from './fromPoints.js'
import { toPoints } from './toPoints.js'

/**
 * Concatenate the given paths.
 *
 * If both contain the same point at the junction, merge it into one.
 * A concatenation of zero paths is an empty, open path.
 * A concatenation of one closed path to a series of open paths produces a closed path.
 * A concatenation of a path to a closed path is an error.
 * @param {...Path2} paths - the paths to concatenate
 * @returns {Path2} a new path
 * @alias module:modeling/geometries/path2.concat
 *
 * @example
 * let newPath = concat(fromPoints({}, [[1, 2]]), fromPoints({}, [[3, 4]]))
 */
export const concat = (...paths) => {
  // Only the last path can be closed, producing a closed path.
  let isClosed = false
  let newPoints = []
  paths.forEach((path, i) => {
    const tmp = toPoints(path).slice()
    if (newPoints.length > 0 && tmp.length > 0 && equals(tmp[0], newPoints[newPoints.length - 1])) tmp.shift()
    if (tmp.length > 0 && isClosed) {
      throw new Error(`Cannot concatenate to a closed path; check the ${i}th path`)
    }
    isClosed = path.isClosed
    newPoints = newPoints.concat(tmp)
  })
  return fromPoints({ closed: isClosed }, newPoints)
}
