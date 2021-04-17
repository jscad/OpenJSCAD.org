/**
 * Build an array of the given target length from an existing array and a padding value.
 * If the array is already larger than the target length, it will not be shortened.
 * @param {Array} anArray - the source array to copy into the result.
 * @param {*} padding - the value to add to the new array to reach the desired length.
 * @param {Number} targetLength - The desired length of the returned array.
 * @returns {Array} an array with at least 'target length" elements
 * @alias module:array-utils.padToLength
 * @example
 * const srcArray = [2, 3, 4]
 * const paddedArray = padToLength(srcArray, 0, 5)
 */
const padToLength = (anArray, padding, targetLength) => {
  anArray = anArray.slice()
  while (anArray.length < targetLength) {
    anArray.push(padding)
  }
  return anArray
}

module.exports = padToLength
