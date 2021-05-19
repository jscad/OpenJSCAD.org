const length = require('./length')

/**
 * Calculates the unit vector of the given vector.
 *
 * @param {vec3} out - the receiving vector
 * @param {vec3} vector - the vector for calculations
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.unit
 */
const unit = (out, vector) => {
  const magnitude = length(vector) // calculate the magnitude
  out[0] = vector[0] / magnitude
  out[1] = vector[1] / magnitude
  out[2] = vector[2] / magnitude
  return out
}

module.exports = unit
