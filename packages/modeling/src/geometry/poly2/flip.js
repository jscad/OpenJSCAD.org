const create = require('./create')

/**
 * Flip the give polygon to rotate the opposite direction.
 *
 * @param {poly2} polygon - the polygon to flip
 * @returns {poly2} a new poly2
 */
const flip = (polygon) => {
  const vertices = polygon.vertices.slice().reverse()
  return create(vertices)
}

module.exports = flip
