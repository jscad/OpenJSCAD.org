import * as vec2 from '../vec2/index.js'

import { copy } from './copy.js'
import { fromValues } from './fromValues.js'

/**
 * Create a new line in the opposite direction as the given.
 *
 * @param {line2} out - receiving line
 * @param {line2} line - line to reverse
 * @returns {line2} out
 * @alias module:modeling/maths/line2.reverse
 */
export const reverse = (out, line) => {
  const normal = vec2.negate(vec2.create(), line)
  const distance = -line[2]
  return copy(out, fromValues(normal[0], normal[1], distance))
}
