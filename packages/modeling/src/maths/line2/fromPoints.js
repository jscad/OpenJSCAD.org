const vec2 = require('../vec2')

/**
 * Create a new line that passes through the given points.
 *
 * @param {line2} out - receiving line
 * @param {vec2} point1 - start point of the line
 * @param {vec2} point2 - end point of the line
 * @returns {line2} a new unbounded line
 * @alias module:modeling/maths/line2.fromPoints
 */
const fromPoints = (out, point1, point2) => {
  const vector = vec2.subtract(vec2.create(), point2, point1) // directional vector

  vec2.normal(vector, vector)
  vec2.normalize(vector, vector) // normalized

  const distance = vec2.dot(point1, vector)

  out[0] = vector[0]
  out[1] = vector[1]
  out[2] = distance
  return out
}

module.exports = fromPoints
