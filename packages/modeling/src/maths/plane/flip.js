const create = require('../vec4/create')

/**
 * Flip the given plane.
 *
 * @param {plane} [out] - receiving plane
 * @param {plane} plane - plane to flip
 * @return {plane} a new plane
 * @alias module:modeling/maths/plane.flip
 */
const flip = (...params) => {
  let out, vec
  if (params.length === 1) {
    out = create()
    vec = params[0]
  } else {
    out = params[0]
    vec = params[1]
  }
  out[0] = -vec[0]
  out[1] = -vec[1]
  out[2] = -vec[2]
  out[3] = -vec[3]
  return out
}

module.exports = flip
