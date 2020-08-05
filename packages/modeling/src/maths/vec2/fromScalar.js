const fromValues = require('./fromValues')

/**
 * Create a vector from a single scalar value.
 * @param  {Number} scalar
 * @returns {Vec2} a new vector
 * @alias module:modeling/maths/vec2.fromScalar
 */
const fromScalar = (scalar) => fromValues(scalar, scalar)

module.exports = fromScalar
