const vec3 = require('../vec3')
const fromValues = require('../vec4/fromValues')

/**
 * Represents a plane in 3D coordinate space as determined by a normal (perpendicular to the plane)
 * and distance from 0,0,0.
 * The contents of the array are a normal [0,1,2] and a distance [3].
 * @see https://en.wikipedia.org/wiki/Hesse_normal_form
 * @typedef {Array} plane
 */

/**
 * Create a new plane from the given normal and point values.
 * @param {vec3} normal - directional vector
 * @param {vec3} point - origin of plane
 * @returns {plane} a new plane
 * @alias module:modeling/maths/plane.fromNormalAndPoint
 */
const fromNormalAndPoint = (normal, point) => {
  const u = vec3.unit(normal)
  const w = vec3.dot(point, u)

  return fromValues(u[0], u[1], u[2], w)
}

module.exports = fromNormalAndPoint
