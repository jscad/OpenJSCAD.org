/**
 * Build an array of at minimum a specified length from an existing array and a padding value. IF the array is already larger than the target length, it will not be shortened.
 * @param {Array} anArray - the source array to copy into the result.
 * @param {*} padding - the value to add to the new array to reach the desired length.
 * @param {Number} targetLength - The desired length of the return array.
 * @returns {Array} an array of at least 'targetLength' length
 * @alias module:modeling/utils.padArrayToLength
 */
const padArrayToLength = (anArray, padding, targetLength) => {
  anArray = anArray.slice()
  while (anArray.length < targetLength) {
    anArray.push(padding)
  }
  return anArray
}

module.exports = padArrayToLength
