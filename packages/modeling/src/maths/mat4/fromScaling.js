/**
 * Creates a matrix from a vector scaling.
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.scale(dest, dest, vec)
 *
 * @param {mat4} out - receiving matrix
 * @param {vec3} vector - X, Y, Z factors by which to scale
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.fromScaling
 * @example
 * let matrix = fromScaling([1, 2, 0.5])
 */
const fromScaling = (out, vector) => {
  out[0] = vector[0]
  out[1] = 0
  out[2] = 0
  out[3] = 0
  out[4] = 0
  out[5] = vector[1]
  out[6] = 0
  out[7] = 0
  out[8] = 0
  out[9] = 0
  out[10] = vector[2]
  out[11] = 0
  out[12] = 0
  out[13] = 0
  out[14] = 0
  out[15] = 1
  return out
}

module.exports = fromScaling
