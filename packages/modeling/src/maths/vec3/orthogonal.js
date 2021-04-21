const abs = require('./abs')

/**
 * Create a vector that is somewhat orthogonal to the given vector.
 * @param {vec3} out - the receiving vector
 * @param {vec3} vector - vector of reference
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.orthogonal
 */
const orthogonal = (out, vector) => {
  abs(out, vector)
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
