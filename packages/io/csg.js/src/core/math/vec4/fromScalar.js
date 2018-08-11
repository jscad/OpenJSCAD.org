/** Create a new vec4 from the given scalar value (single)
 *
 * @param  {Number} scalar
 * @returns {vec4} a new vector
 */
const fromScalar = (scalar) => {
  let out = new Float32Array(4)
  out[0] = scalar
  out[1] = scalar
  out[2] = scalar
  out[3] = scalar
  return out
}

module.exports = fromScalar
