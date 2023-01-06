import * as vec2 from '../../maths/vec2/index.js'

import toOutlines from './toOutlines.js'

/**
 * Create a string representing the contents of the given geometry.
 * @param {geom2} geometry - the geometry
 * @returns {String} a representative string
 * @alias module:modeling/geometries/geom2.toString
 *
 * @example
 * console.out(toString(geometry))
 */
export const toString = (geometry) => {
  const outlines = toOutlines(geometry)
  let result = 'geom2 (' + outlines.length + ' outlines):\n[\n'
  outlines.forEach((outline) => {
    result += '  [' + outline.map(vec2.toString).join() + ']\n'
  })
  result += ']\n'
  return result
}

export default toString
