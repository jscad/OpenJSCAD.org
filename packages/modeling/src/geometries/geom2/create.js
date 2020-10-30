/**
 * @typedef { import("../../maths/mat4/type") } mat4
 * @typedef { import("../../maths/vec2/type") } vec2
 * @typedef { import("./type") } geom2
 * @typedef {[vec2, vec2]} side
 * @typedef {Array<side>} sides
 */

const mat4 = require('../../maths/mat4')

/**
 * Represents a 2D geometry consisting of a list of sides.
 * @property {sides} sides - list of sides, each side containing two points
 * @property {mat4} transforms - transforms to apply to the sides, see transform()
 */

/**
 * Create a new 2D geometry composed of unordered sides (two connected points).
 * @param {sides} [sides] - list of sides where each side is an array of two points
 * @returns {geom2} a new empty geometry
 * @alias module:modeling/geometries/geom2.create
 */
const create = (sides) => {
  if (sides === undefined) {
    sides = [] // empty contents
  }
  return {
    sides: sides,
    transforms: mat4.identity()
  }
}

module.exports = create
