const create = require('./create')

/**
 * Negates the coordinates of a vector.
 *
 * @param {vec3} [out] - the receiving vector
 * @param {vec3} vector - vector to negate
 * @returns {vec3} a new vectory
 * @alias module:modeling/maths/vec3.negate
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
