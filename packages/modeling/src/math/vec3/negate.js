const create = require('./create')

/**
 * Negates the components of a vec3
 *
 * @param {vec3} [out] - the receiving vector
 * @param {vec3} a - vector to negate
 * @returns {vec3} out
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
  out[2] = -a[2]
  return out
}

module.exports = negate
