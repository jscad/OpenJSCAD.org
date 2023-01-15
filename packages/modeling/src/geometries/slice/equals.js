import * as vec3 from '../../maths/vec3/index.js'

/**
 * Determine if the given slices have the same contours.
 * @param {slice} a - the first slice to compare
 * @param {slice} b - the second slice to compare
 * @returns {Boolean} true if the slices are equal
 * @alias module:modeling/geometries/slice.equals
 */
export const equals = (a, b) => {
  if (a.contours.length !== b.contours.length) {
    return false
  }

  const len = a.contours.length
  for (let i = 0; i < len; i++) {
    const aPoint = a.contours[i]
    for (let j = 0; j < len; j++) {
      const bPoint = b.contours[j]
      if (!vec3.equals(aPoint, bPoint)) {
        return false
      }
    }
  }

  return true
}

export default equals
