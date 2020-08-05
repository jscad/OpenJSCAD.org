const fromValues = require('./fromValues')

/**
 * Creates a vector from a single scalar value.
 * All components of the resulting vector have the given value.
 * @param {Float} scalar
 * @returns {Vec3} a new vector
 * @alias module:modeling/maths/vec3.fromScalar
 */
const fromScalar = (scalar) => fromValues(scalar, scalar, scalar)

module.exports = fromScalar
