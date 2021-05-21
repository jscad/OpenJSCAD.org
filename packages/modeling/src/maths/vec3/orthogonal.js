const abs = require('./abs')
const create = require('./create')
const cross = require('./cross')

/**
 * Create a vector that is somewhat orthogonal to the given vector.
 * @param {vec3} out - the receiving vector
 * @param {vec3} vector - vector of reference
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.orthogonal
 */
const orthogonal = (out, vector) => {
  const bV = abs(create(), vector)
  const b0 = 0 + ((bV[0] < bV[1]) && (bV[0] < bV[2]))
  const b1 = 0 + ((bV[1] <= bV[0]) && (bV[1] < bV[2]))
  const b2 = 0 + ((bV[2] <= bV[0]) && (bV[2] <= bV[1]))

  return cross(out, vector, [b0, b1, b2])
}

module.exports = orthogonal
