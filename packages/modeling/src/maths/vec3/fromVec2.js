/**
 * Create a new vector by extending a 2D vector with a Z value.
 *
 * @param {vec3} out - the receiving vector
 * @param {Array} vector - the 2D vector of values
 * @param {Number} [z=0] - Z value
 * @returns {vec3} out
 * @alias module:modeling/maths/vec3.fromVec2
 */
const fromVector2 = (out, vec2, z = 0) => {
  out[0] = vec2[0]
  out[1] = vec2[1]
  out[2] = z
  return out
}

module.exports = fromVector2
