const vec3 = require('../vec3')
const fromValues = require('../vec4/fromValues')

/**
 * Create a new plane from the given normal and point values
 * @param {normal} vec3 - vector 3D
 * @param {point} vec3 - vector 3D
 * @returns {Array} a new plane with properly typed values
 */
const fromNormalAndPoint = (normal, point) => {
  normal = vec3.unit(normal)
  let w = vec3.dot(point, normal)

  return fromValues(normal[0], normal[1], normal[2], w)
}

module.exports = fromNormalAndPoint
