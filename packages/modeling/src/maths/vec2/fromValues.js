const create = require('./create')

/**
 * Creates a new vector initialized with the given values.
 *
 * @param {Number} x - X coordinate
 * @param {Number} y - Y coordinate
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.fromValues
 */
const fromValues = (x, y) => {
  const out = create()
  out[0] = x
  out[1] = y
  return out
}

module.exports = fromValues
