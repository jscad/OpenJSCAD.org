const cross = require('../vec3/cross')
const dot = require('../vec3/dot')
const fromValues = require('../vec3/fromValues')

/**
 * Determine whether the given matrix is a mirroring transformation.
 *
 * @param {mat4} matrix - the matrix
 * @returns {Boolean} true if matrix is a mirroring transformation
 * @alias module:modeling/maths/mat4.isMirroring
 */
const isMirroring = (mat) => {
  const u = fromValues(mat[0], mat[4], mat[8])
  const v = fromValues(mat[1], mat[5], mat[9])
  const w = fromValues(mat[2], mat[6], mat[10])

  // for a true orthogonal, non-mirrored base, u.cross(v) == w
  // If they have an opposite direction then we are mirroring
  const mirrorvalue = dot(cross(u, u, v), w)
  const ismirror = (mirrorvalue < 0)
  return ismirror
}

module.exports = isMirroring
