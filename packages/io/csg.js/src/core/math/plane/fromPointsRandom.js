const EPS = require('../../constants')
const vec3 = require('../vec3')
const fromValues = require('../vec4/fromValues')

/** Create a new plane from the given points like fromPoints, 
 * but allow the vectors to be on one point or one line
 * in such a case a random plane through the given points is constructed
 * @param {Vec3} a - 3D point
 * @param {Vec3} b - 3D point
 * @param {Vec3} c - 3D point
 * @returns {Vec4} a new plane with properly typed values
 */
const fromPointsRandom = (a, b, c) => {
  let v1 = vec3.subtract(b, a)
  let v2 = vec3.subtract(c, a)
  if (vec3.length(v1) < EPS) {
    v1 = vec3.random(v2)
  }
  if (vec3.length(v2) < EPS) {
    v2 = vec3.random(v1)
  }
  let normal = vec3.cross(v1, v2)
  if (vec3.length(normal) < EPS) {
    // this would mean that v1 == v2.negated()
    v2 = vec3.random(v1)
    normal = vec3.cross(v1, v2)
  }
  normal = vec3.unit(normal)
  return fromValues(normal[0], normal[1], normal[2], vec3.dot(normal, a))
}

module.exports = fromPointsRandom