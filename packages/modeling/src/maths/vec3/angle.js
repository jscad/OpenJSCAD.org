const normalize = require('./normalize')
const dot = require('./dot')

/**
 * Calculate the angle between two vectors.
 * @param {vec3} a - the first operand
 * @param {vec3} b - the second operand
 * @returns {Number} the angle in radians
 * @alias module:modeling/maths/vec3.angle
 */
const angle = (a, b) => {
  const tempA = normalize(a)
  const tempB = normalize(b)

  const cosine = dot(tempA, tempB)
  return cosine > 1.0 ? 0 : Math.acos(cosine)
}

module.exports = angle
