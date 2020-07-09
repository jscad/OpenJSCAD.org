const create = require('./create')

/**
 * Normalize the given vector.
 *
 * @param {vec3} [out] - the receiving vector
 * @param {vec3} vector - vector to normalize
 * @returns {vec3} a new vector
 * @alias module:modeling/maths/vec3.normalize
 */
const normalize = (...params) => {
  let a
  let out
  if (params.length === 1) {
    a = params[0]
    out = create()
  } else {
    out = params[0]
    a = params[1]
  }
  const x = a[0]
  const y = a[1]
  const z = a[2]
  let len = x * x + y * y + z * z
  if (len > 0) {
    // TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len)
    out[0] = a[0] * len
    out[1] = a[1] * len
    out[2] = a[2] * len
  }
  return out
}

module.exports = normalize
