const vec2 = require('../vec2')
const { solve2Linear } = require('../utils')

/**
 * Return the point of intersection between the given lines.
 *
 * NOTES:
 * The point will have Infinity values if the lines are parallel.
 * The point will have NaN values if the lines are the same.
 *
 * @param {line2} line1 - line of reference
 * @param {line2} line2 - line of reference
 * @return {vec2} the point of intersection
 * @alias module:modeling/maths/line2.intersectPointOfLines
 */
const intersectToLine = (line1, line2) => {
  const point = solve2Linear(line1[0], line1[1], line2[0], line2[1], line1[2], line2[2])
  return vec2.clone(point)
}

module.exports = intersectToLine
