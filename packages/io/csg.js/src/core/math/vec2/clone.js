const fromValues = require('./fromValues')

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new vec2
 */
const clone = (vector) => {
  return fromValues(vector[0], vector[1])
}

module.exports = clone
