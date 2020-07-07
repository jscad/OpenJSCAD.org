const vec2 = require('../vec2')

const clone = require('./clone')
const create = require('./create')
const fromValues = require('./fromValues')

/**
 * Create a new line in the opposite direction as the given.
 *
 * @param {line2} [out] - receiving line
 * @param {line2} line the 2D line to reverse
 * @returns {line2} a new unbounded line
 * @alias module:modeling/maths/line2.reverse
 */
const reverse = (...params) => {
  let out
  let line
  if (params.length === 1) {
    out = create()
    line = params[0]
  } else {
    out = params[0]
    line = params[1]
  }

  const normal = vec2.negate(line)
  const distance = -line[2]
  return clone(out, fromValues(normal[0], normal[1], distance))
}

module.exports = reverse
