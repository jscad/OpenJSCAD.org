import { EPS } from '../../src/maths/constants.js'

/**
 * Compare two vectors for equality
 * @param {number[]} vec1 - vector (array) of values
 * @param {number[]} vec2 - vector (array) of values
 * @param {number} eps - Epsilon - the largest difference between two numbers to consider trivial
 * @returns {boolean} result of comparison
 */
export const compareVectors = (vec1, vec2, eps = EPS) => {
  if (vec1.length === vec2.length) {
    return vec1.reduce((valid, value, index) => {
      // get the values, which also does type conversions
      const value1 = vec1[index]
      const value2 = vec2[index]
      // special comparison for NAN values
      // type is Number, and value is NaN
      if (Number.isNaN(value1) && Number.isNaN(value2)) {
        return valid
      }
      // type is Number, and value is finite
      if (Number.isFinite(value1) && Number.isFinite(value2)) {
        // compare number values, not types
        const diff = Math.abs(value1 - value2)
        return valid && (diff < eps)
      }
      // catch mistakes in usage
      if (typeof value1 !== 'number') throw new Error('invalid usage of compareVectors; vec1')
      if (typeof value2 !== 'number') throw new Error('invalid usage of compareVectors; vec2')

      return valid
    }, true)
  }
  return false
}
