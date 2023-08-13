/**
 * Create a shallow clone of the given polygon.
 *
 * @param {Poly2} polygon - polygon to clone
 * @returns {Poly2} a new polygon
 * @alias module:modeling/geometries/poly2.clone
 */
export const clone = (polygon) => Object.assign({}, polygon)
