import * as vec3 from '../../maths/vec3/index.js'

/**
 * Convert the given slice to a readable string.
 * @param {slice} slice - the slice
 * @return {String} the string representation
 * @alias module:modeling/geometries/slice.toString
 */
export const toString = (slice) => {
  let result = 'slice (' + slice.contours.length + ' contours):\n[\n'
  slice.contours.forEach((contour) => {
    result += '  [' + contour.map(vec3.toString).join() + '],\n'
  })
  result += ']\n'
  return result
}

export default toString
