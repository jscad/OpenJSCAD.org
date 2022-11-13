import create from './create.js'

/**
 * Flip the give polygon, rotating the opposite direction.
 *
 * @param {poly2} polygon - the polygon to flip
 * @returns {poly2} a new polygon
 * @alias module:modeling/geometries/poly2.flip
 */
export const flip = (polygon) => {
  const vertices = polygon.vertices.slice().reverse()
  return create(vertices)
}

export default flip
