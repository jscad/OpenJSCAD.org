import * as vec3 from '../vec3/index.js'

/**
 * Represents a plane in 3D coordinate space as determined by a normal (perpendicular to the plane)
 * and distance from 0,0,0.
 *
 * The contents of the array are a normal [0,1,2] and a distance [3].
 * @see https://en.wikipedia.org/wiki/Hesse_normal_form
 */

/**
 * Create a new plane from the given normal and point values.
 *
 * @param {Plane} out - receiving plane
 * @param {Vec3} normal - directional vector
 * @param {Vec3} point - origin of plane
 * @returns {Plane} out
 * @alias module:modeling/maths/plane.fromNormalAndPoint
 */
export const fromNormalAndPoint = (out, normal, point) => {
  const u = vec3.normalize(vec3.create(), normal)
  const w = vec3.dot(point, u)

  out[0] = u[0]
  out[1] = u[1]
  out[2] = u[2]
  out[3] = w
  return out
}
