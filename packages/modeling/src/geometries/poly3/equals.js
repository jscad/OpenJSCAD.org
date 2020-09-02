const vec3 = require('../../maths/vec3')

/**
 * Compare the given geometries for equality.
 * @param {poly3} first - a geometry to compare
 * @param {poly3} second - a geometry to compare
 * @returns {Boolean} true if the given geometries are equal
 * @alias module:modeling/geometries/poly3.equals
 */
const equals = (first, second) => {
  if (first.vertices.length !== second.vertices.length) return false

  for (let i = 0; i < first.vertices.length; i++) {
    const v1 = first.vertices[i]
    const v2 = second.vertices[i]
    if (!vec3.equals(v1, v2)) {
      return false
    }
  }
  return true
}

module.exports = equals
