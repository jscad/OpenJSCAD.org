const create = require('./create')

/**
 * Reverse the direction of vertices in the given polygon, rotating the opposite direction.
 *
 * @param {poly2} polygon - the polygon to reverse
 * @returns {poly2} a new polygon
 * @alias module:modeling/geometries/poly2.reverse
 */
const reverse = (polygon) => {
  const vertices = polygon.vertices.slice().reverse()
  return create(vertices)
}

module.exports = reverse
