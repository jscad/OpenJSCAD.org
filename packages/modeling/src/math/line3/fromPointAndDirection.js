const vec3 = require('../vec3')

/**
 * Create a line in 3D space from the given data.
 *
 * The point can be any random point on the line.
 * The direction must be a vector with positive or negative distance from the point.
 * See the logic of fromPoints for appropriate values.
 *
 * @param {vec3} point start point of the line segment
 * @param {vec3} direction direction of the line segment
 * @returns {line3} a new unbounded 3D line
 */
const fromPointAndDirection = (point, direction) => {
  const unit = vec3.unit(direction)
  return [point, unit]
}

module.exports = fromPointAndDirection
