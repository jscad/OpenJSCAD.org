/**
 * Determine if the given object is a slice.
 * @param {slice} object - the object to interrogate
 * @returns {Boolean} true if the object matches a slice
 * @alias module:modeling/extrusions/slice.isA
 */
const isA = (object) => {
  if (object && typeof object === 'object') {
    if ('edges' in object) {
      if (Array.isArray(object.edges)) {
        return true
      }
    }
  }
  return false
}

module.exports = isA
