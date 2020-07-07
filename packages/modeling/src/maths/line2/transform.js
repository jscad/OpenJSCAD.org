const vec2 = require('../vec2')

const fromPoints = require('./fromPoints')
const origin = require('./origin')
const direction = require('./direction')
const clone = require('./clone')
const create = require('./create')

/**
 * Transforms the given 2D line using the given matrix.
 *
 * @param {line2} [out] - receiving line
 * @param {mat4} matrix matrix to transform with
 * @param {line2} line the 2D line to transform
 * @returns {line2} a new unbounded line
 * @alias module:modeling/maths/line2.transform
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

  const org = origin(line)
  const dir = direction(line)

  vec2.transform(org, matrix, org)
  vec2.transform(dir, matrix, dir)

  return clone(out, fromPoints(org, dir))
}

module.exports = transform
