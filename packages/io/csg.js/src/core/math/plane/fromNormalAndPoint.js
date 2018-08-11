const vec3 = require('../../math/vec3')
const fromData = require('./fromData')

/**
 * Create a new plane from the given normal and point values
 * @param {normal} vec3 - vector 3D
 * @param {point} vec3 - vector 3D
 * @returns {Array} a new plane with properly typed values
 */
const fromNormalAndPoint = (normal, point) => {
  // FIXME optimize later
  normal = vec3.fromVarious(normal)
  point = vec3.fromVarious(point)

  normal = vec3.unit(normal)
  let w = vec3.dot(point, normal)

  normal.push(w)
  return fromData(normal)
}

module.exports = fromNormalAndPoint
