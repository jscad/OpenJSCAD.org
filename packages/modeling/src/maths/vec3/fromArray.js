const create = require('./create')

/**
 * Creates a new vector initialized with the values in the given array.
 * @param {Array} data - array of numerical values
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/vec3.fromArray
 */
const fromArray = (data) => {
  const out = create()
  out[0] = data[0]
  out[1] = data[1]
  out[2] = data[2]
  return out
}

module.exports = fromArray
