const vec3 = require('../vec3')

const fromPointAndDirection = require('./fromPointAndDirection')

/**
 * Transforms the given line using the given matrix.
 *
 * @param {line3} out - line to update
 * @param {line3} line - line to transform
 * @param {mat4} matrix - matrix to transform with
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.transform
 */
const transform = (out, line, matrix) => {
  const point = line[0]
  const direction = line[1]
  const pointPlusDirection = vec3.add(vec3.create(), point, direction)

  const newpoint = vec3.transform(vec3.create(), point, matrix)
  const newPointPlusDirection = vec3.transform(pointPlusDirection, pointPlusDirection, matrix)
  const newdirection = vec3.subtract(newPointPlusDirection, newPointPlusDirection, newpoint)

  return fromPointAndDirection(out, newpoint, newdirection)
}

module.exports = transform
