const rotate = require('./rotate')

/**
 * Calculates the normal value of the give vector
 * The normal value is the given vector rotated 90 degress.
 *
 * @param {vec2} [out] - receiving vector
 * @param {vec2} vec - given value
 * @returns {vec2} normal value of the vector
 */
const normal = (...params) => {
  let out
  let vec
  if (params.length === 1) {
    vec = params[0]
    return rotate((Math.PI / 2), vec)
  }
  out = params[0]
  vec = params[1]
  return rotate(out, (Math.PI / 2), vec)
}

module.exports = normal
