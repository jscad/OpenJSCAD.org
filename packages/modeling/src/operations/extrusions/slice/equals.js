import * as vec3 from '../../../maths/vec3/index.js'

/**
 * Determine if the given slices have the same parts.
 * @param {slice} a - the first slice to compare
 * @param {slice} b - the second slice to compare
 * @returns {Boolean} true if the slices are equal
 * @alias module:modeling/extrusions/slice.equals
 */
export const equals = (a, b) => {
  if (a.parts.length !== b.parts.length) {
    return false
  }

  const len = a.parts.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const aPoint = a.parts[i]
      const bPoint = b.parts[j]
      if (!vec3.equals(aPoint, bPoint)) {
        return false
      }
    }
  }

  return true
}

export default equals
