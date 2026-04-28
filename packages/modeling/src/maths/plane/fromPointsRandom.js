import { EPS } from '../constants.js'

import * as vec3 from '../vec3/index.js'

/**
 * Create a new plane from the given points like fromPoints,
 * but allow the vectors to be on one point or one line.
 * In such a case, a random plane through the given points is constructed.
 *
 * @param {Plane} out - receiving plane
 * @param {Vec3} a - 3D point
 * @param {Vec3} b - 3D point
 * @param {Vec3} c - 3D point
 * @returns {Plane} out
 * @alias module:modeling/maths/plane.fromPointsRandom
 */
export const fromPointsRandom = (out, a, b, c) => {
  const ba = vec3.subtract(vec3.create(), b, a)
  const ca = vec3.subtract(vec3.create(), c, a)
  if (vec3.length(ba) < EPS) {
    vec3.orthogonal(ba, ca)
  }
  if (vec3.length(ca) < EPS) {
    vec3.orthogonal(ca, ba)
  }

  // calculate plane normal
  const normal = vec3.cross(out, ba, ca)
  if (vec3.length(normal) < EPS) {
    // this would mean that ba == ca.negated()
    vec3.orthogonal(ca, ba)
    vec3.cross(normal, ba, ca)
  }
  vec3.normalize(normal, normal)

  // and distance
  out[3] = vec3.dot(normal, a)

  return out
}
