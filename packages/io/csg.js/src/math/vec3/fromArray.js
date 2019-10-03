const create = require('./create')

/**
 * Creates a new vec3 initialized with the values in the given array
 * @param {Number[]} data - array of numerical values
 * @returns {vec3} a new 3D vector
 */
const fromArray = (data) => {
  const out = create()
  out[0] = data[0]
  out[1] = data[1]
  out[2] = data[2]
  return out
}

module.exports = fromArray
