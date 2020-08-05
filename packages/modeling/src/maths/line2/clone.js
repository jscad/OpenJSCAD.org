const create = require('./create')

/**
 * Create a clone of the given 2D line.
 *
 * @param {line2} [out] - receiving line
 * @param {line2} line - line to clone
 * @returns {line2} a new unbounded line
 * @alias module:modeling/maths/line2.clone
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
  out[0] = line[0]
  out[1] = line[1]
  out[2] = line[2]
  return out
}

module.exports = clone
