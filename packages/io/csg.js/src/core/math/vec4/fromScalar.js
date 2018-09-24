const fromValues = require('./fromValues')

/** Create a new vec4 from the given scalar value (single)
 *
 * @param  {Number} scalar
 * @returns {vec4} a new vector
 */
const fromScalar = (scalar) => {
  return fromValues(scalar, scalar, scalar, scalar)
}

module.exports = fromScalar
