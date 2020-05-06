const fromValues = require('./fromValues')

/**
 * Create a vector from a single scalar value.
 * @param  {Number} scalar
 * @returns {Vec2} a new vector
 * @alias module:modeling/math/vec2.fromScalar
 */
const fromScalar = (scalar) => {
  return fromValues(scalar, scalar)
}

module.exports = fromScalar
