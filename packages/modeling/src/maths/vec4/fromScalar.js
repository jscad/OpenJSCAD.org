const fromValues = require('./fromValues')

/**
 * Create a new vector from the given scalar value.
 *
 * @param  {Number} scalar
 * @returns {vec4} a new vector
 * @alias module:modeling/maths/vec4.fromScalar
 */
const fromScalar = (scalar) => fromValues(scalar, scalar, scalar, scalar)

module.exports = fromScalar
