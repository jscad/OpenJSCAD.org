const vec3 = require('../vec3')

const clone = require('./clone')
const create = require('./create')
const fromPointAndDirection = require('./fromPointAndDirection')

/**
 * Transforms the given 3D line using the given matrix.
 *
 * @param {mat4} matrix - matrix to transform with
 * @param {line3} line - the line to transform
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.transform
 */
const transform = (...params) => {
  let out
  let matrix
  let line
  if (params.length === 2) {
    out = create()
    matrix = params[0]
    line = params[1]
  } else {
    out = params[0]
    matrix = params[1]
    line = params[2]
  }

  const point = line[0]
  const direction = line[1]
  const pointPlusDirection = vec3.add(point, direction)

  const newpoint = vec3.transform(matrix, point)
  const newPointPlusDirection = vec3.transform(matrix, pointPlusDirection)
  const newdirection = vec3.subtract(newPointPlusDirection, newpoint)

  return clone(out, fromPointAndDirection(newpoint, newdirection))
}

module.exports = transform
