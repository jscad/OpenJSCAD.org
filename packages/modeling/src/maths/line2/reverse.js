const vec2 = require('../vec2')

const copy = require('./copy')
const fromValues = require('./fromValues')

/**
 * Create a new line in the opposite direction as the given.
 *
 * @param {line2} out - receiving line
 * @param {line2} line - line to reverse
 * @returns {line2} out
 * @alias module:modeling/maths/line2.reverse
 */
const reverse = (out, line) => {
  const normal = vec2.negate(vec2.create(), line)
  const distance = -line[2]
  return copy(out, fromValues(normal[0], normal[1], distance))
}

module.exports = reverse
