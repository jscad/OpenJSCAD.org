import * as vec3 from '../../maths/vec3/index.js'

/**
 * Determine if the given slices have the same contours.
 * @param {Slice} a - the first slice to compare
 * @param {Slice} b - the second slice to compare
 * @returns {Boolean} true if the slices are equal
 * @alias module:modeling/geometries/slice.equals
 */
export const equals = (a, b) => {
  if (a.contours.length !== b.contours.length) {
    return false
  }

  const len = a.contours.length
  for (let i = 0; i < len; i++) {
    const aVertex = a.contours[i]
    for (let j = 0; j < len; j++) {
      const bVertex = b.contours[j]
      if (!vec3.equals(aVertex, bVertex)) {
        return false
      }
    }
  }

  return true
}
