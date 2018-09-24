const vec3 = require('../../math/vec3')
const fromVector3Ds = require('./fromVector3Ds')

/**
 * Create a new plane from the given points
 * @param {a} object - any value that can be converted to vector 3D
 * @param {b} object - any value that can be converted to vector 3D
 * @param {c} object - any value that can be converted to vector 3D
 * @returns {Array} a new plane with properly typed values
 */
const fromPoints = (a, b, c) => {
  const v1 = vec3.fromVarious(a)
  const v2 = vec3.fromVarious(b)
  const v3 = vec3.fromVarious(c)
  return fromVector3Ds(v1, v2, v3)
}

module.exports = fromPoints
