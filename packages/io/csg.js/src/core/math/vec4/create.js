/**
 * Creates a new vec4 initialized to zero
 *
 * @returns {vec4} a new vector
 */
const create = () => {
  const out = new Float32Array(4)
  out[0] = 0
  out[1] = 0
  out[2] = 0
  out[3] = 0
  return out
}

module.exports = create
