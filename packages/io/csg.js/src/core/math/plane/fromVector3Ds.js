const vec3 = require('../vec3')
const fromValues = require('../vec4/fromValues')

/**
 * Create a new plane from the given vec3 values
 * @param {a} vec3 - vector 3D
 * @param {b} vec3 - vector 3D
 * @param {c} vec3 - vector 3D
 * @returns {Array} a new plane with properly typed values
 */
const fromVector3Ds = (a, b, c) => {
  // let n = b.minus(a).cross(c.minus(a)).unit()
  // FIXME optimize later
  const ba = vec3.subtract(b, a)
  const ca = vec3.subtract(c, a)
  const cr = vec3.cross(ba, ca)
  const normal = vec3.unit(cr) // normal part
  const w = vec3.dot(normal, a)
  return fromValues(normal[0], normal[1], normal[2], w)
}

module.exports = fromVector3Ds
