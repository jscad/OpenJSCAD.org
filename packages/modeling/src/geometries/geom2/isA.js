/**
 * Determine if the given object is a 2D geometry.
 * @param {Object} object - the object to interrogate
 * @returns {Boolean} true, if the object matches a geom2 based object
 * @alias module:modeling/geometries/geom2.isA
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

export default isA
