import * as vec2 from '../vec2/index.js'

/**
 * Return the direction of the given line.
 *
 * @param {Line2} line - line of reference
 * @return {Vec2} a vector in the direction of the line
 * @alias module:modeling/maths/line2.direction
 */
export const direction = (line) => {
  const vector = vec2.normal(vec2.create(), line)
  vec2.negate(vector, vector)
  return vector
}
