const nodeBlob = require('./Blob.js')

/**
 * Make a constructor for Blob objects.
 * @return {Function} constructor of Blob objects
 * @alias module:io/utils.makeBlob
 * @example
 * const Blob = makeBlob()
 * const ablob = new Blob(data, { type: mimeType })
 */
const makeBlob = () => {
  const blob = typeof window !== 'undefined' ? window.Blob : nodeBlob
  return blob
}

module.exports = makeBlob
