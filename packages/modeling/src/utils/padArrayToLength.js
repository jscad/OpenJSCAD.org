/**
 * Fill an array with a default value, until it reaches a specified length.
 * @param {Array} arr - the array to potentially add elements to.
 * @param padding - the element to add to the array to reach the desired length.
 * @param {Number} targetLength - The desired length of the return array.
 * @returns {Array} an array of at least 'targetLength" length
 * @alias module:modeling/utils.padArrayToLength
 */
const padArrayToLength = (arr, padding, targetLength) => {
  arr = arr.slice()
  while (arr.length < targetLength) {
    arr.push(padding)
  }
  return arr
}

module.exports = padArrayToLength
