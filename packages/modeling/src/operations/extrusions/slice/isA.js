/**
 * Determin if the given object is a slice.
 * @params {slice} object - the object to interogate
 * @returns {true} if the object matches a slice based object
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
