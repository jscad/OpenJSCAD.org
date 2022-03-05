const plane = require('../../maths/plane')
const create = require('./create')

/**
 * Invert the give polygon to face the opposite direction.
 *
 * @param {poly3} polygon - the polygon to invert
 * @returns {poly3} a new poly3
 * @alias module:modeling/geometries/poly3.invert
 */
const invert = (polygon) => {
  const vertices = polygon.vertices.slice().reverse()
  const inverted = create(vertices)
  if (polygon.plane) {
    // Flip existing plane to save recompute
    inverted.plane = plane.flip(plane.create(), polygon.plane)
  }
  return inverted
}

module.exports = invert
