const create = require('./create')

/**
 * Creates a new vec4 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @param {Number} w W component
 * @returns {vec4} a new vector
 */
const fromValues = (x, y, z, w) => {
  const out = create()
  out[0] = x
  out[1] = y
  out[2] = z
  out[3] = w
  return out
}

module.exports = fromValues
