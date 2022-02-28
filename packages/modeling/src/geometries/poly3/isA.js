/**
 * Determine if the given object is a polygon.
 * @param {Object} object - the object to interrogate
 * @returns {Boolean} true if the object matches a poly3
 * @alias module:modeling/geometries/poly3.isA
 */
const isA = (object) => {
  if (object && typeof object === 'object') {
    if ('vertices' in object) {
      if (Array.isArray(object.vertices)) {
        return true
      }
    }
  }
  return false
}

module.exports = isA
