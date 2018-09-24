const vec3 = require('../vec3')
const fromValues = require('../vec4/fromValues')

/**
 * Create a new plane from the given normal and point values
 * @param {normal} vec3 - vector 3D
 * @param {point} vec3 - vector 3D
 * @returns {Array} a new plane with properly typed values
 */
const fromNormalAndPoint = (normal, point) => {
  const u = vec3.unit(normal)
  const w = vec3.dot(point, u)

  return fromValues(u[0], u[1], u[2], w)
}

module.exports = fromNormalAndPoint
