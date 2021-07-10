const { EPS } = require('../constants')

const vec3 = require('../vec3')

/**
 * Create a new plane from the given points like fromPoints,
 * but allow the vectors to be on one point or one line.
 * In such a case, a random plane through the given points is constructed.
 *
 * @param {plane} out - receiving plane
 * @param {vec3} a - 3D point
 * @param {vec3} b - 3D point
 * @param {vec3} c - 3D point
 * @returns {plane} out
 * @alias module:modeling/maths/plane.fromPointsRandom
 */
const fromPointsRandom = (out, a, b, c) => {
  let ba = vec3.subtract(vec3.create(), b, a)
  let ca = vec3.subtract(vec3.create(), c, a)
  if (vec3.length(ba) < EPS) {
    ba = vec3.orthogonal(ba, ca)
  }
  if (vec3.length(ca) < EPS) {
    ca = vec3.orthogonal(ca, ba)
  }
  let normal = vec3.cross(vec3.create(), ba, ca)
  if (vec3.length(normal) < EPS) {
    // this would mean that ba == ca.negated()
    ca = vec3.orthogonal(ca, ba)
    normal = vec3.cross(normal, ba, ca)
  }
  normal = vec3.normalize(normal, normal)
  const w = vec3.dot(normal, a)

  out[0] = normal[0]
  out[1] = normal[1]
  out[2] = normal[2]
  out[3] = w
  return out
}

module.exports = fromPointsRandom
