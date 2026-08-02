/**
 * Determine if the given object is a 3D geometry.
 *
 * @param {Object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a geom3
 * @alias module:modeling/geom3.isA
 *
 * @example
 * if (geom3.isA(geometry)) { ... }
 */
export const isA = (object) => {
  if (object && typeof object === 'object') {
    if ('polygons' in object && 'transforms' in object) {
      if (Array.isArray(object.polygons) && 'length' in object.transforms) {
        return true
      }
    }
  }
  return false
}
