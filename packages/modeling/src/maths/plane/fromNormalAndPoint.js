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
  // normalize to out
  vec3.normalize(out, normal)
  // calculate distance
  out[3] = vec3.dot(point, out)

  return out
}
