const vec3 = require('../vec3')

/**
 * Represents a unbounded line in 3D space, positioned at a point of origin.
 * A line is parametrized by a point of origin and a directional vector.
 *
 * The array contents are two 3D vectors; origin [0,0,0] and directional vector [0,0,1].
 * @see https://en.wikipedia.org/wiki/Hesse_normal_form
 * @typedef {Array} line3
 */

/**
 * Create a line, positioned at 0,0,0 and lying on the X axis.
 *
 * @returns {line3} a new unbounded line
 * @alias module:modeling/maths/line3.create
 */
const create = () => [
  vec3.fromValues(0, 0, 0), // origin
  vec3.fromValues(0, 0, 1) // direction
]

module.exports = create
