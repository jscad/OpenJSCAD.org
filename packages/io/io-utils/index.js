/**
 * Utility functions of various sorts in support of IO packages.
 * @module io/utils
 * @example
 * const { BinaryReader } = require('@jscad/io-utils')
 */
module.exports = {
  convertToBlob: require('./convertToBlob'),
  makeBlob: require('./makeBlob'),
  BinaryReader: require('./BinaryReader'),
  Blob: require('./Blob'),
  ensureString: require('./ensureString')
}
