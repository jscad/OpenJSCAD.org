const create = require('./create')

/**
 * Scales the coordinates of the given vector.
 *
 * @param {vec2} [out] - the receiving vector
 * @param {Number} amount - amount to scale
 * @param {vec2} vector - the vector to scale
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.scale
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
  return out
}

module.exports = scale
