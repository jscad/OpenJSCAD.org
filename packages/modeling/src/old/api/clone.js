
/** clone the given object
 * @param {Object} obj - the object to clone by
 * @returns {CSG} new CSG object , a copy of the input
 *
 * @example
 * let copy = clone(sphere())
 */
function clone (obj) {
  if (obj === null || typeof obj !== 'object') return obj
  var copy = obj.constructor()
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr]
  }
  return copy
}

module.exports = {
  clone
}
