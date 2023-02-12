import * as vec3 from '../vec3/index.js'

import { fromPointAndDirection } from './fromPointAndDirection.js'

/**
 * Create a line in the opposite direction as the given.
 *
 * @param {line3} out - receiving line
 * @param {line3} line - line to reverse
 * @returns {line3} out
 * @alias module:modeling/maths/line3.reverse
 */
export const reverse = (out, line) => {
  const point = vec3.clone(line[0])
  const direction = vec3.negate(vec3.create(), line[1])
  return fromPointAndDirection(out, point, direction)
}
