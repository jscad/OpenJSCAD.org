const fromValues = require('./fromValues')

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new vector
 */
const clone = (vec) => {
  return fromValues(vec[0], vec[1], vec[2])
}

module.exports = clone
