import * as vec2 from '../vec2/index.js'

import direction from './direction.js'
import origin from './origin.js'

/**
 * Determine the closest point on the given line to the given point.
 *
 * @param {line2} line - line of reference
 * @param {vec2} point - point of reference
 * @returns {vec2} closest point
 * @alias module:modeling/maths/line2.closestPoint
 */
export const closestPoint = (line, point) => {
  // linear function of AB
  const a = origin(line)
  const b = direction(line)
  const m1 = (b[1] - a[1]) / (b[0] - a[0])
  const t1 = a[1] - m1 * a[0]
  // linear function of PC
  const m2 = -1 / m1 // perpendicular
  const t2 = point[1] - m2 * point[0]
  // c.x * m1 + t1 === c.x * m2 + t2
  const x = (t2 - t1) / (m1 - m2)
  const y = m1 * x + t1

  const closest = vec2.fromValues(x, y)
  return closest
}

export default closestPoint
