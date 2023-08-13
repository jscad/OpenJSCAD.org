import * as vec2 from '../vec2/index.js'

/**
 * Return the origin of the given line.
 * The origin is the point on the line which is closest to the origin [0, 0].
 *
 * @param {Line2} line - line of reference
 * @return {Vec2} the origin of the line
 * @alias module:modeling/maths/line2.origin
 */
export const origin = (line) => vec2.scale(vec2.create(), line, line[2])
