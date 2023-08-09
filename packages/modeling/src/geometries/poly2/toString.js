import * as vec2 from '../../maths/vec2/index.js'

/**
 * Convert the given polygon to a readable string.
 * @param {Poly2} polygon - the polygon to convert
 * @return {String} the string representation
 * @alias module:modeling/geometries/poly2.toString
 */
export const toString = (polygon) => `poly2: [${polygon.points.map(vec2.toString).join(', ')}]`
