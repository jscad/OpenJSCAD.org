/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
const create = () => {
  const out = new Float32Array(3)
  out[0] = 0
  out[1] = 0
  out[2] = 0
  return out
}

module.exports = create
