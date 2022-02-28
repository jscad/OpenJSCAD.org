const cross = require('../vec3/cross')
const dot = require('../vec3/dot')
const fromValues = require('../vec3/fromValues')

/**
 * Determine whether the given matrix is a mirroring transformation.
 *
 * @param {mat4} matrix - matrix of reference
 * @returns {Boolean} true if matrix is a mirroring transformation
 * @alias module:modeling/maths/mat4.isMirroring
 */
const isMirroring = (matrix) => {
  const u = fromValues(matrix[0], matrix[4], matrix[8])
  const v = fromValues(matrix[1], matrix[5], matrix[9])
  const w = fromValues(matrix[2], matrix[6], matrix[10])

  // for a true orthogonal, non-mirrored base, u.cross(v) == w
  // If they have an opposite direction then we are mirroring
  const mirrorvalue = dot(cross(u, u, v), w)
  const ismirror = (mirrorvalue < 0)
  return ismirror
}

module.exports = isMirroring
