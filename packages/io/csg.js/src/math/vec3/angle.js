const normalize = require('./normalize')
const dot = require('./dot')

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
const angle = (a, b) => {
  const tempA = normalize(a)
  const tempB = normalize(b)

  const cosine = dot(tempA, tempB)
  return cosine > 1.0 ? 0 : Math.acos(cosine)
}

module.exports = angle
