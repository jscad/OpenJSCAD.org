import * as vec2 from '../../maths/vec2/index.js'

/**
 * Convert the given polygon to a readable string.
 * @param {poly2} polygon - the polygon to convert
 * @return {String} the string representation
 * @alias module:modeling/geometries/poly2.toString
 */
export const toString = (polygon) => {
  let result = 'poly2: vertices: ['
  polygon.vertices.forEach((vertex) => {
    result += `${vec2.toString(vertex)}, `
  })
  result += ']'
  return result
}

export default toString
