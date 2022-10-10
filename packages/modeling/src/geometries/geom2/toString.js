import * as vec2 from '../../maths/vec2/index.js'

import toSides from './toSides.js'

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
  const sides = toSides(geometry)
  let result = 'geom2 (' + sides.length + ' sides):\n[\n'
  sides.forEach((side) => {
    result += '  [' + vec2.toString(side[0]) + ', ' + vec2.toString(side[1]) + ']\n'
  })
  result += ']\n'
  return result
}

export default toString
