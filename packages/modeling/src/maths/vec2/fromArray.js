const create = require('./create')

/**
 * Create a new vector initialized with the values in the given array.
 * @param {Array} data - array of numerical values
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.fromArray
 */
const fromArray = (data) => {
  const out = create()
  out[0] = data[0]
  out[1] = data[1]
  return out
}

module.exports = fromArray
