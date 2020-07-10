const abs = require('./abs')
const create = require('./create')

/**
 * Create a vector that is somewhat orthogonal to the given vector.
 * @param {vec3} [out] - the receiving vector
 * @param {vec3} vector - vector of reference
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/vec3.orthogonal
 */
const orthogonal = (...params) => {
  let out
  let vec
  if (params.length === 1) {
    out = create()
    vec = params[0]
  } else {
    out = params[0]
    vec = params[1]
  }
  abs(out, vec)
  if ((out[0] <= out[1]) && (out[0] <= out[2])) {
    out[0] = 1
    out[1] = 0
    out[2] = 0
  } else if ((out[1] <= out[0]) && (out[1] <= out[2])) {
    out[0] = 0
    out[1] = 1
    out[2] = 0
  } else {
    out[0] = 0
    out[1] = 0
    out[2] = 1
  }
  return out
}

module.exports = orthogonal
