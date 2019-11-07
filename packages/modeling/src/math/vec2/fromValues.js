const create = require('./create')

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
const fromValues = (x, y) => {
  const out = create()
  out[0] = x
  out[1] = y
  return out
}

module.exports = fromValues
