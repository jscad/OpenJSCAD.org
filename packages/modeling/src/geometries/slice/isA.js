/**
 * Determine if the given object is a slice.
 * @param {Slice} object - the object to interrogate
 * @returns {Boolean} true if the object matches a slice
 * @alias module:modeling/geometries/slice.isA
 */
export const isA = (object) => {
  if (object && typeof object === 'object') {
    if ('contours' in object) {
      if (Array.isArray(object.contours)) {
        return true
      }
    }
  }
  return false
}
