const vec3 = require('../../../math/vec3')

/**
 * Determine if the given slices are equal.
 * @param {slice} a - the first slice to compare
 * @param {slice} b - the second slice to compare
 * @returns {Boolean}
 * @alias module:modeling/extrusions/slice.equals
 */
const equals = (a, b) => {
  const aedges = a.edges
  const bedges = b.edges

  if (aedges.length !== bedges.length) {
    return false
  }

  const isEqual = aedges.reduce((acc, aedge, i) => {
    const bedge = bedges[i]
    const d = vec3.squaredDistance(aedge[0], bedge[0])
    return acc && (d < Number.EPSILON)
  }, true)

  return isEqual
}

module.exports = equals
