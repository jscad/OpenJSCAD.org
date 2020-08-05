const vec2 = require('../vec2')

/**
 * Return the origin of the given line.
 *
 * @param {line2} line the 2D line of reference
 * @return {vec2} the origin of the line
 * @alias module:modeling/maths/line2.origin
 */
const origin = (line) => {
  const point = vec2.scale(line[2], line)
  return point
}

module.exports = origin
