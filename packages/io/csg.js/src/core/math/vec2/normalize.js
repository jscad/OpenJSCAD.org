const create = require('./create')

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
const normalize = (...params) => {
  let a
  let out
  if (params.length === 1) {
    out = create()
    a = params[0]
  } else {
    out = params[0]
    a = params[1]
  }
  const x = a[0]
  const y = a[1]
  let len = x * x + y * y
  if (len > 0) {
    // TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len)
    out[0] = a[0] * len
    out[1] = a[1] * len
  }
  return out
}

module.exports = normalize
