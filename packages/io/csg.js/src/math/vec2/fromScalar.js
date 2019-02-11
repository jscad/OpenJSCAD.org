const fromValues = require('./fromValues')

/** Create a vec2 from a single scalar value
 * @param  {Float} scalar
 * @returns {Vec2} a new vec2
 */
const fromScalar = (scalar) => {
  return fromValues(scalar, scalar)
}

module.exports = fromScalar
