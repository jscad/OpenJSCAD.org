const vec3 = require('../vec3')
const fromValues = require('../vec4/fromValues')

/**
 * Create a new plane from the given normal and point values
 * @param {vec3} normal - vector 3D
 * @param {vec3} point - vector 3D
 * @returns {plane} a new plane with properly typed values
 */
const fromNormalAndPoint = (normal, point) => {
  const u = vec3.unit(normal)
  const w = vec3.dot(point, u)

  return fromValues(u[0], u[1], u[2], w)
}

module.exports = fromNormalAndPoint
