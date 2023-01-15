/**
 * Determine if the given object is a slice.
 * @param {slice} object - the object to interrogate
 * @returns {Boolean} true if the object matches a slice
 * @alias module:modeling/extrusions/slice.isA
 */
export const isA = (object) => {
  if (object && typeof object === 'object') {
    if ('parts' in object) {
      if (Array.isArray(object.parts)) {
        return true
      }
    }
  }
  return false
}

export default isA
