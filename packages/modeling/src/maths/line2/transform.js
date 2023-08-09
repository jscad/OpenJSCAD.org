import * as vec2 from '../vec2/index.js'

import { fromPoints } from './fromPoints.js'
import { origin } from './origin.js'
import { direction } from './direction.js'

/**
 * Transforms the given line using the given matrix.
 *
 * @param {Line2} out - receiving line
 * @param {Line2} line - line to transform
 * @param {Mat4} matrix - matrix to transform with
 * @returns {Line2} out
 * @alias module:modeling/maths/line2.transform
 */
export const transform = (out, line, matrix) => {
  const org = origin(line)
  const dir = direction(line)

  vec2.transform(org, org, matrix)
  vec2.transform(dir, dir, matrix)

  return fromPoints(out, org, dir)
}
