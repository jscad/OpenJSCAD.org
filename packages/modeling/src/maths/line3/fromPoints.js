const vec3 = require('../vec3')

const fromPointAndDirection = require('./fromPointAndDirection')

/**
 * Creates a new 3D line that passes through the given points.
 *
 * @param {vec3} point1 - start point of the line segment
 * @param {vec3} point2 - end point of the line segment
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.fromPoints
 */
const fromPoints = (point1, point2) => {
  const direction = vec3.subtract(point2, point1)
  return fromPointAndDirection(point1, direction)
}

module.exports = fromPoints
