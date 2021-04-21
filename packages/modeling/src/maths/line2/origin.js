const vec2 = require('../vec2')

/**
 * Return the origin of the given line.
 *
 * @param {line2} line the 2D line of reference
 * @return {vec2} the origin of the line
 * @alias module:modeling/maths/line2.origin
 */
const origin = (line) => vec2.scale(vec2.create(), line, line[2])

module.exports = origin
