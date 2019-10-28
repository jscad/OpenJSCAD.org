/**
 * Determin if the given object is a 3D geometry.
 * @params {object} object - the object to interogate
 * @returns {true} if the object matches a geom3 based object
 */
const isA = (object) => {
  if (object && typeof object === 'object') {
    if ('polygons' in object && 'transforms' in object) {
      if (Array.isArray(object.polygons) && 'length' in object.transforms) {
        return true
      }
    }
  }
  return false
}

module.exports = isA
