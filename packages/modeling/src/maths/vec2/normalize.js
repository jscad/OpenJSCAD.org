const create = require('./create')

/**
 * Normalize the given vector.
 *
 * @param {vec2} [out] - the receiving vector
 * @param {vec2} a - vector to normalize
 * @returns {vec2} a new (unit) vector
 * @alias module:modeling/maths/vec2.normalize
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
    len = 1 / Math.sqrt(len)
  }
  out[0] = x * len
  out[1] = y * len
  return out
}

// old this.dividedBy(this.length())

module.exports = normalize
