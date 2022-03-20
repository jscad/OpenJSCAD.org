/**
 * Determine if the given object is a 2D geometry.
 * @param {Object} object - the object to interrogate
 * @returns {Boolean} true, if the object matches a geom2 based object
 * @alias module:modeling/geometries/geom2.isA
 */
const isA = (object) => {
  if (object && typeof object === 'object') {
    if ('sides' in object && 'transforms' in object) {
      if (Array.isArray(object.sides) && 'length' in object.transforms) {
        return true
      }
    }
  }
  return false
}

module.exports = isA
