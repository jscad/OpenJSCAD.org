/**
 * Create a shallow clone of the given polygon.
 *
 * @param {poly2} polygon - polygon to clone
 * @returns {poly2} a new polygon
 * @alias module:modeling/geometries/poly2.clone
 */
export const clone = (polygon) => Object.assign({}, polygon)

export default clone
