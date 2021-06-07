/**
 * Creates a inverse copy of the given matrix.
 *
 * @param {mat4} m - matrix to invert
 * @returns {mat4} out
 * @alias module:modeling/maths/mat4.inverse
 */
const inverse = (m) => {
  const s0 = m[0] * m[5] - m[4] * m[1]
  const s1 = m[0] * m[6] - m[4] * m[2]
  const s2 = m[0] * m[7] - m[4] * m[3]
  const s3 = m[1] * m[6] - m[5] * m[2]
  const s4 = m[1] * m[7] - m[5] * m[3]
  const s5 = m[2] * m[7] - m[6] * m[3]

  const c5 = m[10] * m[15] - m[14] * m[11]
  const c4 = m[9] * m[15] - m[13] * m[11]
  const c3 = m[9] * m[14] - m[13] * m[10]
  const c2 = m[8] * m[15] - m[12] * m[11]
  const c1 = m[8] * m[14] - m[12] * m[10]
  const c0 = m[8] * m[13] - m[12] * m[9]

  const determinant = 1 / (s0 * c5 - s1 * c4 + s2 * c3 + s3 * c2 - s4 * c1 + s5 * c0)

  if (isNaN(determinant) || determinant === Infinity) {
    throw new Error('Inverse determinant attempted to divide by zero.')
  }

  return [
    (m[5] * c5 - m[6] * c4 + m[7] * c3) * determinant,
    (-m[1] * c5 + m[2] * c4 - m[3] * c3) * determinant,
    (m[13] * s5 - m[14] * s4 + m[15] * s3) * determinant,
    (-m[9] * s5 + m[10] * s4 - m[11] * s3) * determinant,

    (-m[4] * c5 + m[6] * c2 - m[7] * c1) * determinant,
    (m[0] * c5 - m[2] * c2 + m[3] * c1) * determinant,
    (-m[12] * s5 + m[14] * s2 - m[15] * s1) * determinant,
    (m[8] * s5 - m[10] * s2 + m[11] * s1) * determinant,

    (m[4] * c4 - m[5] * c2 + m[7] * c0) * determinant,
    (-m[0] * c4 + m[1] * c2 - m[3] * c0) * determinant,
    (m[12] * s4 - m[13] * s2 + m[15] * s0) * determinant,
    (-m[8] * s4 + m[9] * s2 - m[11] * s0) * determinant,

    (-m[4] * c3 + m[5] * c1 - m[6] * c0) * determinant,
    (m[0] * c3 - m[1] * c1 + m[2] * c0) * determinant,
    (-m[12] * s3 + m[13] * s1 - m[14] * s0) * determinant,
    (m[8] * s3 - m[9] * s1 + m[10] * s0) * determinant
  ]
}

module.exports = inverse
