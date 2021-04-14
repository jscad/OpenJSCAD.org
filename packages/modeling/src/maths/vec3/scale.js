const create = require('./create')

/**
 * Scales the coordinates of the given vector by a scalar number.
 *
 * @param {vec3} [out] - the receiving vector
 * @param {Number} amount - amount to scale the vector by
 * @param {vec3} vector - the vector to scale
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/vec3.scale
 */
const scale = (...params) => {
  let out
  let vector
  let amount
  if (params.length === 2) {
    out = create()
    amount = params[0]
    vector = params[1]
  } else {
    out = params[0]
    amount = params[1]
    vector = params[2]
  }
  out[0] = vector[0] * amount
  out[1] = vector[1] * amount
  out[2] = vector[2] * amount
  return out
}

module.exports = scale
