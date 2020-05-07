const create = require('./create')

/**
 * Flip the give polygon to face the opposite direction.
 *
 * @param {poly3} polygon - the polygon to flip
 * @returns {poly3} a new polygon
 * @alias module:modeling/geometry/poly3.flip
 */
const flip = (polygon) => {
  const vertices = polygon.vertices.slice().reverse()
  return create(vertices)
}

module.exports = flip
