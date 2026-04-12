/**
 * Determine if the given object is a 2D geometry.
 *
 * @param {object} object - the object to interrogate
 * @returns {Boolean} true, if the object matches a geom2 based object
 * @alias module:modeling/geom2.isA
 *
 * @example
 * const geometry = geom2.isA(geometry)
 */
export const isA = (object) => {
  if (object && typeof object === 'object') {
    if ('outlines' in object && 'transforms' in object) {
      if (Array.isArray(object.outlines) && 'length' in object.transforms) {
        return true
      }
    }
  }
  return false
}
