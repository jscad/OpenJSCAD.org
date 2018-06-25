module.exports = fromValues

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec3} a new 2D vector
 */
function fromValues (x, y) {
  let out = new Float32Array(2)
  out[0] = x
  out[1] = y
  return out
}
