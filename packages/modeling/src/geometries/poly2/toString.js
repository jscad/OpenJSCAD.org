import * as vec2 from '../../maths/vec2/index.js'

/**
 * Convert the given polygon to a readable string.
 * @param {poly2} polygon - the polygon to convert
 * @return {String} the string representation
 * @alias module:modeling/geometries/poly2.toString
 */
export const toString = (polygon) => {
  return `poly2: [${polygon.points.map(vec2.toString).join(', ')}]`
}

export default toString
