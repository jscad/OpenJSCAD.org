/** create a vec3 from a single scalar value
 * all components of the resulting vec3 have the value of the
 * input scalar
 * @param  {Float} scalar
 * @returns {Vec3}
 */
const fromScalar = (scalar) => {
  let out = new Float32Array(3)
  out[0] = scalar
  out[1] = scalar
  out[2] = scalar
  return out
}

module.exports = fromScalar
