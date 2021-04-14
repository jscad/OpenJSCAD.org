const vec3 = require('../vec3')

const fromPointAndDirection = require('./fromPointAndDirection')

/**
 * Represents a unbounded line in 3D space, positioned at a point of origin.
 * A line is parametrized by a point of origin and a directional vector.
 * The array contents are two 3D vectors; origin and directional vector.
 * @see https://en.wikipedia.org/wiki/Hesse_normal_form
 * @typedef {Array} line3
 */

/**
 * Create an unbounded 3D line, positioned at 0,0,0 and lying on the X axis.
 *
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.create
 */
const create = () => {
  const point = vec3.create() // 0, 0, 0
  const direction = vec3.fromValues(0, 0, 1)
  return fromPointAndDirection(point, direction)
}

module.exports = create
