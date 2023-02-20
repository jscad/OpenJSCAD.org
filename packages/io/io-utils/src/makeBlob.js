import { Blob as nodeBlob } from './Blob.js'

/**
 * Make a constructor for Blob objects.
 * @return {Function} constructor of Blob objects
 * @alias module:io/utils.makeBlob
 * @example
 * const Blob = makeBlob()
 * const ablob = new Blob(data, { type: mimeType })
 */
export const makeBlob = () => {
  const blob = typeof window !== 'undefined' ? window.Blob : nodeBlob
  return blob
}
