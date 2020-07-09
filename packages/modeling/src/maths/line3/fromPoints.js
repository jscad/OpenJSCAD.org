const vec3 = require('../vec3')

const fromPointAndDirection = require('./fromPointAndDirection')

/**
 * Creates a new 3D line that passes through the given points.
 *
 * @param {vec3} p1 - start point of the line segment
 * @param {vec3} p2 - end point of the line segment
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.fromPoints
 */
const fromPoints = (p1, p2) => {
  const direction = vec3.subtract(p2, p1)
  return fromPointAndDirection(p1, direction)
}

module.exports = fromPoints
