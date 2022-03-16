const create = require('./create')

/**
 * Creates a new line initialized with the given values.
 *
 * @param {Number} x - X coordinate of the unit normal
 * @param {Number} y - Y coordinate of the unit normal
 * @param {Number} d - distance of the line from [0,0]
 * @returns {line2} a new unbounded line
 * @alias module:modeling/maths/line2.fromValues
 */
const fromValues = (x, y, d) => {
  const out = create()
  out[0] = x
  out[1] = y
  out[2] = d
  return out
}

module.exports = fromValues
