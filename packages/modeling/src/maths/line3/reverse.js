const vec3 = require('../vec3')

const clone = require('./clone')
const create = require('./create')
const fromPointAndDirection = require('./fromPointAndDirection')

/**
 * Create a new line in the opposite direction as the given.
 *
 * @param {line3} [out] - receiving line
 * @param {line3} line - the line to reverse
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.reverse
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

  const point = vec3.clone(line[0])
  const direction = vec3.negate(line[1])
  return clone(out, fromPointAndDirection(point, direction))
}

module.exports = reverse
