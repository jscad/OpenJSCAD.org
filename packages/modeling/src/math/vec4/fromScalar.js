const fromValues = require('./fromValues')

/**
 * Create a new vector from the given scalar value (single).
 *
 * @param  {Number} scalar
 * @returns {vec4} a new vector
 * @alias module:modeling/math/vec4.fromScalar
 */
const fromScalar = (scalar) => {
  return fromValues(scalar, scalar, scalar, scalar)
}

module.exports = fromScalar
