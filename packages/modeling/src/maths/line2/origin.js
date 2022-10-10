import * as vec2 from '../vec2/index.js'

/**
 * Return the origin of the given line.
 *
 * @param {line2} line - line of reference
 * @return {vec2} the origin of the line
 * @alias module:modeling/maths/line2.origin
 */
export const origin = (line) => vec2.scale(vec2.create(), line, line[2])

export default origin
