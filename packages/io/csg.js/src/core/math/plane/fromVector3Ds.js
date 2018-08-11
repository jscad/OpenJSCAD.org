const vec3 = require('../../math/vec3')
const fromData = require('./fromData')

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
  let ba = vec3.subtract(b, a)
  let ca = vec3.subtract(c, a)
  let cr = vec3.cross(ba, ca)
  let plane = vec3.unit(cr) // normal part
  let w = vec3.dot(plane, a)
  plane.push(w)
  return fromData(plane)
}

module.exports = fromVector3Ds
