/**
 * Determine if the given object is a 2D polygon.
 *
 * @param {object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a poly2
 * @alias module:modeling/poly2.isA
 *
 * @example
 * if (poly2.isA(geometry)) { ... }
 */
export const isA = (object) => {
  if (object && typeof object === 'object') {
    if ('points' in object) {
      if (Array.isArray(object.points)) {
        return true
      }
    }
  }
  return false
}
