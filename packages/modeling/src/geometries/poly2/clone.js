/**
 * Create a shallow clone of the given polygon.
 *
 * @param {Poly2} polygon - polygon to clone
 * @returns {Poly2} a new polygon
 * @alias module:modeling/poly2.clone
 *
 * @example
 * const newPoly = poly2.clone(oldPoly)
 */
export const clone = (polygon) => Object.assign({}, polygon)
