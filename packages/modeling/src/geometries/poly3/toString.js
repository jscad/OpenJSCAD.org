import * as vec3 from '../../maths/vec3/index.js'

/**
 * @param {poly3} polygon - the polygon to measure
 * @return {String} the string representation
 * @alias module:modeling/geometries/poly3.toString
 */
export const toString = (polygon) => {
  let result = 'poly3: vertices: ['
  polygon.vertices.forEach((vertex) => {
    result += `${vec3.toString(vertex)}, `
  })
  result += ']'
  return result
}

export default toString
