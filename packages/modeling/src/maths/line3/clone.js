const vec3 = require('../vec3')

const create = require('./create')

/**
 * Create a clone of the given 3D line.
 *
 * @param {line3} [out] - receiving line
 * @param {line3} line - line to clone
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.clone
 */
const clone = (...params) => {
  let out
  let line
  if (params.length === 1) {
    out = create()
    line = params[0]
  } else {
    out = params[0]
    line = params[1]
  }
  vec3.clone(out[0], line[0])
  vec3.clone(out[1], line[1])
  return out
}

module.exports = clone
