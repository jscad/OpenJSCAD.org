/**
 * Create a new vec4 initialized with values from the given vec4
 *
 * @param {vec4} a vector to clone
 * @returns {vec4} a new vector
 */
const clone = (avec) => {
  var out = new Float32Array(4)
  out[0] = avec[0]
  out[1] = avec[1]
  out[2] = avec[2]
  out[3] = avec[3]
  return out
}

module.exports = clone
