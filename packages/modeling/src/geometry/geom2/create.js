const mat4 = require('../../math/mat4')

/**
 * Create a new 2D geometry composed of unordered sides (two connected points).
 * @param {Array} [sides] - list of sides where each side is an array of two points
 * @returns {geom2} a new empty geometry
 */
const create = function (sides) {
  if (sides === undefined) {
    sides = [] // empty contents
  }
  return {
    sides : sides,
    transforms : mat4.identity()
  }
}

module.exports = create
