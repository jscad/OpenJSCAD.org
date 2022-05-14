/**
 * Determine whether the given matrix is a mirroring transformation.
 *
 * @param {mat4} matrix - matrix of reference
 * @returns {Boolean} true if matrix is a mirroring transformation
 * @alias module:modeling/maths/mat4.isMirroring
 */
const isMirroring = (matrix) => {
  // const xVector = [matrix[0], matrix[4], matrix[8]]
  // const yVector = [matrix[1], matrix[5], matrix[9]]
  // const zVector = [matrix[2], matrix[6], matrix[10]]

  // for a true orthogonal, non-mirrored base, xVector.cross(yVector) == zVector
  // If they have an opposite direction then we are mirroring
  // calcuate xVector.cross(yVector)
  const x = matrix[4] * matrix[9] - matrix[8] * matrix[5]
  const y = matrix[8] * matrix[1] - matrix[0] * matrix[9]
  const z = matrix[0] * matrix[5] - matrix[4] * matrix[1]
  // calcualte dot(cross, zVector)
  const d = x * matrix[2] + y * matrix[6] + z * matrix[10]
  return (d < 0)
}

module.exports = isMirroring
