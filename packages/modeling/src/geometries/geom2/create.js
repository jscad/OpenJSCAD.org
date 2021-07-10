const mat4 = require('../../maths/mat4')

/**
 * Represents a 2D geometry consisting of a list of sides.
 * @typedef {Object} geom2
 * @property {Array} sides - list of sides, each side containing two points
 * @property {mat4} transforms - transforms to apply to the sides, see transform()
 */

/**
 * Create a new 2D geometry composed of unordered sides (two connected points).
 * @param {Array} [sides] - list of sides where each side is an array of two points
 * @returns {geom2} a new geometry
 * @alias module:modeling/geometries/geom2.create
 */
const create = (sides) => {
  if (sides === undefined) {
    sides = [] // empty contents
  }
  return {
    sides: sides,
    transforms: mat4.create()
  }
}

module.exports = create
