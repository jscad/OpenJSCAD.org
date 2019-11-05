/**
 * Determin if the given object is a 2D geometry.
 * @params {geom2} object - the object to interogate
 * @returns {true} if the object matches a geom2 based object
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
