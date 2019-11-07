const create = require('./create')
const length = require('./length')

/**
 * Calculates the unit vector of the given vector
 *
 * @param {vec3} [out] - the optional receiving vector
 * @param {vec3} vector - the base vector for calculations
 * @returns {vec3} unit vector of the given vector
 */
const unit = (...params) => {
  let out
  let vector
  if (params.length === 1) {
    out = create()
    vector = params[0]
  } else {
    out = params[0]
    vector = params[1]
  }
  const magnitude = length(vector) // calculate the magnitude
  out[0] = vector[0] / magnitude
  out[1] = vector[1] / magnitude
  out[2] = vector[2] / magnitude
  return out
}

module.exports = unit
