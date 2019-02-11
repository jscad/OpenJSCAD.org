/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
const create = () => {
  const out = new Float32Array(2)
  out[0] = 0
  out[1] = 0
  return out
}

module.exports = create
