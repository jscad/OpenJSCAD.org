const vec2 = require('../vec2')

const fromValues = require('./fromValues')

/**
 * Create a new line that passes through the given points.
 *
 * @param {vec2} point1 start point of the 2D line
 * @param {vec2} point2 end point of the 2D line
 * @returns {line2} a new unbounded line
 * @alias module:modeling/maths/line2.fromPoints
 */
const fromPoints = (point1, point2) => {
  const vector = vec2.subtract(point2, point1) // directional vector

  vec2.normal(vector, vector)
  vec2.normalize(vector, vector) // normalized

  const distance = vec2.dot(point1, vector)

  return fromValues(vector[0], vector[1], distance)
}

module.exports = fromPoints
