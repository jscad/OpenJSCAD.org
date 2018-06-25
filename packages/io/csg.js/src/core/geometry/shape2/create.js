/**
 * create shape2/ CAG
 * Holds a solid area geometry like CSG but 2D.
 * Each area consists of a number of sides.
 * Each side is a line between 2 points.
 * @constructor
 */
const create = function () {
  return {
    type: 'shape2',
    sides: [],
    isCanonicalized: false
  }
}

module.exports = create
