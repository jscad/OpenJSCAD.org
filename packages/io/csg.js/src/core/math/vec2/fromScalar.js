/** create a vec2 from a single scalar value
 * all components of the resulting vec2 have the value of the
 * input scalar
 * @param  {Float} scalar
 * @returns {Vec2}
 */
const fromScalar = (scalar) => {
  let out = new Float32Array(2)
  out[0] = scalar
  out[1] = scalar
  return out
}

module.exports = fromScalar
