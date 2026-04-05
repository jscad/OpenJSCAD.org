/**
 * Determine if the given object is a polygon.
 *
 * @param {object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a poly3
 * @alias module:modeling/poly3.isA
 *
 * @example
 * if (poly3.isA(geometry)) { ... }
 */
export const isA = (object) => {
  if (object && typeof object === 'object') {
    if ('vertices' in object) {
      if (Array.isArray(object.vertices)) {
        return true
      }
    }
  }
  return false
}
