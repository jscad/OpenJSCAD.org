const vec3 = require('../vec3')

/**
 * Create a line in 3D space from the given point (origin) and direction.
 *
 * The point can be any random point on the line.
 * The direction must be a vector with positive or negative distance from the point.
 * See the logic of fromPoints() for appropriate values.
 *
 * @param {line3} out - the receiving line
 * @param {vec3} point - the start point of the line segment
 * @param {vec3} direction - the direction of the line segment
 * @returns {line3} out
 * @alias module:modeling/maths/line3.fromPointAndDirection
 */
const fromPointAndDirection = (out, point, direction) => {
  const unit = vec3.unit(vec3.create(), direction)

  vec3.copy(out[0], point)
  vec3.copy(out[1], unit)
  return out
}

module.exports = fromPointAndDirection
