const create = require('./create')

/**
 * Creates a new vec2 initialized with the values in the given array
 * any value at an index > 1 is ignored !
 * @param {Array} data array of numerical values
 * @returns {vec2} a new 2D vector
 */
const fromArray = (data) => {
  const out = create()
  out[0] = data[0]
  out[1] = data[1]
  return out
}

module.exports = fromArray
