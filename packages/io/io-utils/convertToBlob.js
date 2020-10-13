const makeBlob = require('./makeBlob')

const Blob = makeBlob()

/**
 * Convert the given input into a BLOB of data for export.
 * @param {Object} input - input object to convert
 * @param {Array} input.data - array of data to be inserted into the blob, either String or ArrayBuffer
 * @param {String} input.mimeType - mime type of the data to be inserted
 * @return {Blob} a new Blob
 * @alias module:io/utils.convertToBlob
 * @example
 * const blob1 = convertToBlob({ data: ['test'], mimeType: 'text/plain' })
 * const blob2 = convertToBlob({ data: [Int32Array.from('12345').buffer], mimeType: 'application/mine' })
 */
const convertToBlob = (input) => {
  const { data, mimeType } = input
  const blob = new Blob(data, { type: mimeType })
  return blob
}

module.exports = convertToBlob
