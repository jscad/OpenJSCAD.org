const { EPS } = require('../constants')

const vec3 = require('../vec3')

const { fromValues } = require('../vec4')

/**
 * Create a new plane from the given points like fromPoints,
 * but allow the vectors to be on one point or one line.
 * In such a case, a random plane through the given points is constructed.
 * @param {vec3} a - 3D point
 * @param {vec3} b - 3D point
 * @param {vec3} c - 3D point
 * @returns {plane} a new plane
 * @alias module:modeling/maths/plane.fromPointsRandom
 */
const fromPointsRandom = (a, b, c) => {
  let ba = vec3.subtract(b, a)
  let ca = vec3.subtract(c, a)
  if (vec3.length(ba) < EPS) {
    ba = vec3.orthogonal(ca)
  }
  if (vec3.length(ca) < EPS) {
    ca = vec3.orthogonal(ba)
  }
  let normal = vec3.cross(ba, ca)
  if (vec3.length(normal) < EPS) {
    // this would mean that ba == ca.negated()
    ca = vec3.orthogonal(ba)
    normal = vec3.cross(ba, ca)
  }
  normal = vec3.unit(normal)
  return fromValues(normal[0], normal[1], normal[2], vec3.dot(normal, a))
}

module.exports = fromPointsRandom
