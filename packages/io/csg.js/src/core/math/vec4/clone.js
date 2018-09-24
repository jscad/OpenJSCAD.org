const fromValues = require('./fromValues')

/**
 * Create a new vec4 initialized with values from the given vector
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new vector
 */
const clone = (vec) => {
  return fromValues(vec[0], vec[1], vec[2], vec[3])
}

module.exports = clone
