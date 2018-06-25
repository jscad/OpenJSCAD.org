module.exports = normalize
const create = require('./create')

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
function normalize (...params) {
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
  let len = x * x + y * y
  if (len > 0) {
    // TODO: evaluate use of glm_invsqrt here?
    len = 1 / Math.sqrt(len)
    out[0] = a[0] * len
    out[1] = a[1] * len
  }
  return out
}
