const rotate = require('./rotate')

/**
 * Calculates the normal of the given vector.
 * The normal value is the given vector rotated 90 degress.
 *
 * @param {vec2} [out] - receiving vector
 * @param {vec2} vec - given value
 * @returns {vec2} a new vector
 * @alias module:modeling/maths/vec2.normal
 */
const normal = (...params) => {
  if (params.length === 1) {
    const vec = params[0]
    return rotate((Math.PI / 2), vec)
  } else {
    const out = params[0]
    const vec = params[1]
    return rotate(out, (Math.PI / 2), vec)
  }
}

module.exports = normal
