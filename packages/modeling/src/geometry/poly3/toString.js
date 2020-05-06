const plane = require('../../math/plane/')
const vec3 = require('../../math/vec3/')

/**
 * @param {poly3} polygon - the polygon to measure
 * @return {String} the string representation
 * @alias module:modeling/geometry/poly3.toString
 */
const toString = (poly3) => {
  let result = `poly3: plane: ${plane.toString(poly3.plane)}, \n  vertices: [`
  poly3.vertices.forEach((vertex) => {
    result += `${vec3.toString(vertex)}, `
  })
  result += ']'
  return result
}

module.exports = toString
