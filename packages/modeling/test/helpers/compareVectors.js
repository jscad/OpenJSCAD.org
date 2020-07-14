/**
 * Compare two vectors for equality
 * @param (vec} vec1 - vector (array) of values
 * @param (vec} vec2 - vector (array) of values
 * @returns {boolean} result of comparison
 */
const compareVectors = (vec1, vec2, eps = Number.EPSILON) => {
  if (vec1.length === vec2.length) {
    return vec1.reduce((valid, value, index) => {
      // special comparison for NAN values
      if (isNaN(vec1[index]) && isNaN(vec2[index])) {
        return valid
      }
      // special comparison for Infinite values
      if ((!Number.isFinite(vec1[index])) && (!Number.isFinite(vec2[index]))) {
        return valid
      }
      // only compare values, not types
      const diff = Math.abs(vec1[index] - vec2[index])
      return valid && (diff < eps)
    }, true)
  }
  return false
}

module.exports = compareVectors
