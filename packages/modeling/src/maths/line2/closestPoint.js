import * as vec2 from '../vec2/index.js'

import { direction } from './direction.js'
import { origin } from './origin.js'

/**
 * Determine the closest point on the given line to the given point.
 *
 * @param {Line2} line - line of reference
 * @param {Vec2} point - point of reference
 * @returns {Vec2} closest point
 * @alias module:modeling/maths/line2.closestPoint
 */
export const closestPoint = (line, point) => {
  const orig = origin(line)
  const dir = direction(line)

  const v = vec2.subtract(vec2.create(), point, orig)
  const dist = vec2.dot(v, dir)
  vec2.scale(v, dir, dist)
  vec2.add(v, v, orig)
  return v
}
