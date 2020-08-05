const create = require('./create')

/**
 * Creates a new vector initialized with the given values.
 *
 * @param {Number} x - X component
 * @param {Number} y - Y component
 * @param {Number} z - Z component
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/vec3.fromValues
 */
const fromValues = (x, y, z) => {
  const out = create()
  out[0] = x
  out[1] = y
  out[2] = z
  return out
}

module.exports = fromValues
