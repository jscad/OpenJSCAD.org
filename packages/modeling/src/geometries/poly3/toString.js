import * as vec3 from '../../maths/vec3/index.js'

/**
 * Convert the given polygon to a readable string.
 * @param {poly3} polygon - the polygon to convert
 * @return {String} the string representation
 * @alias module:modeling/geometries/poly3.toString
 */
export const toString = (polygon) => `poly3: [${polygon.vertices.map(vec3.toString).join(', ')}]`
