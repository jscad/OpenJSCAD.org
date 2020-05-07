/**
 * Determin if the given object is a polygon.
 * @param {Object} object - the object to interogate
 * @returns {Boolean} true if the object matches a poly3
 * @alias module:modeling/geometry/poly3.isA
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
