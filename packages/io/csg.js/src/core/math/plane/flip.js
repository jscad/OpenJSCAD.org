const create = require('../vec4/create')

/**
 * Flip the given plane (vec4)
 *
 * @param {vec4} [out] - receiving plane
 * @param {vec4} vec - plane to flip
 * @return {vec4} flipped plane
 */
const flip = (...params) => {
  let out
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
