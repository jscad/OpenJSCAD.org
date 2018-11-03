const create = require('./create')

const plane = require('../../math/plane/')

/**
 * Flip the give polygon to face the opposite direction.
 *
 * @param {poly3} polygon - the polygon to flip
 * @returns {poly3} a new poly3
 */
const flip = (polygon) => {
  const out = create()
  out.vertices = polygon.vertices.reverse()
  out.plane = plane.flip(polygon.plane)
  return out
}

module.exports = flip
