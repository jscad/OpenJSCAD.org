const fromValues = require('./fromValues')

/** create a vec3 from a single scalar value
 * all components of the resulting vec3 have the value of the
 * input scalar
 * @param  {Float} scalar
 * @returns {Vec3}
 */
const fromScalar = (scalar) => {
  return fromValues(scalar, scalar, scalar)
}

module.exports = fromScalar
