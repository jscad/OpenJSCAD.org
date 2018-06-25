const poly3 = require('../poly3')
const fromPolygons = require('./fromPolygons')

/**
 * Return a new CSG solid with solid and empty space switched.
 * This solid is not modified.
 * @returns {Shape3} new Shape3 object
 * @example
 * let B = invert(A)
 */
function invert (shape3) {
  let flippedpolygons = shape3.polygons.map(polygon => poly3.flip(polygon))
  return fromPolygons(flippedpolygons)
  // TODO: flip properties?
}

module.exports = invert
