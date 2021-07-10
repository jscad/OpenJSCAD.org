const vec3 = require('../vec3')

const fromPointAndDirection = require('./fromPointAndDirection')

/**
 * Create a line in the opposite direction as the given.
 *
 * @param {line3} out - receiving line
 * @param {line3} line - line to reverse
 * @returns {line3} out
 * @alias module:modeling/maths/line3.reverse
 */
const reverse = (out, line) => {
  const point = vec3.clone(line[0])
  const direction = vec3.negate(vec3.create(), line[1])
  return fromPointAndDirection(out, point, direction)
}

module.exports = reverse
