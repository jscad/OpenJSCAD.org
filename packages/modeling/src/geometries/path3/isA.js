/**
 * Determine if the given object is a path3 geometry.
 *
 * @param {Object} object - the object to interrogate
 * @returns {boolean} true if the object matches a path3
 * @function
 * @alias module:modeling/geometries/path3.isA
 */
export const isA = (object) => {
  if (object && typeof object === 'object') {
    // see create for the required attributes and types
    if ('vertices' in object && 'transforms' in object && 'isClosed' in object) {
      // NOTE: transforms should be a TypedArray, which has a read-only length
      if (Array.isArray(object.vertices) && 'length' in object.transforms) {
        return true
      }
    }
  }
  return false
}
