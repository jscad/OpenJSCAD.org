const fromValues = require('../vec4/fromValues')

/**
 * Create a new plane from the given data
 * @param  {Array} data - array(4) of normal and w values
 * @returns {Array} a new plane with properly typed values
 */
const fromData = (data) => {
  return fromValues(data[0], data[1], data[2], data[3])
}

module.exports = fromData
