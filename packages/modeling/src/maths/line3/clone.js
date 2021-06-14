const vec3 = require('../vec3')

const create = require('./create')

/**
 * Create a clone of the given line.
 *
 * @param {line3} line - line to clone
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.clone
 */
const clone = (line) => {
  const out = create()
  vec3.copy(out[0], line[0])
  vec3.copy(out[1], line[1])
  return out
}

module.exports = clone
