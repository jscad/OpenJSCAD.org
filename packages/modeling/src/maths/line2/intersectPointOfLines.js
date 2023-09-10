import * as vec2 from '../vec2/index.js'

import { solve2Linear } from '../utils/solve2Linear.js'

/**
 * Return the point of intersection between the given lines.
 *
 * NOTES:
 * The point will have Infinity values if the lines are parallel.
 * The point will have NaN values if the lines are the same.
 *
 * @param {Line2} line1 - line of reference
 * @param {Line2} line2 - line of reference
 * @return {Vec2} the point of intersection
 * @alias module:modeling/maths/line2.intersectPointOfLines
 */
export const intersectPointOfLines = (line1, line2) => {
  const point = solve2Linear(line1[0], line1[1], line2[0], line2[1], line1[2], line2[2])
  return vec2.clone(point)
}
