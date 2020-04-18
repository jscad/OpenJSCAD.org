const create = require('./create')

/**
 * Negates the components of a vec2
 *
 * @param {vec2} [out] - the receiving vector
 * @param {vec2} a - vector to negate
 * @returns {vec2} out
 */
const negate = (...params) => {
  let out
  let a
  if (params.length === 1) {
    out = create()
    a = params[0]
  } else {
    out = params[0]
    a = params[1]
  }
  out[0] = -a[0]
  out[1] = -a[1]
  return out
}

module.exports = negate
