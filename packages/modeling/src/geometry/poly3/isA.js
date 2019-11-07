/**
 * Determin if the given object is a poly3.
 * @params {poly3} object - the object to interogate
 * @returns {true} if the object matches a poly3 based object
 */
const isA = (object) => {
  if (object && typeof object === 'object') {
    if ('vertices' in object && 'plane' in object) {
      if (Array.isArray(object.vertices) && 'length' in object.plane) {
        return true
      }
    }
  }
  return false
}

module.exports = isA
