/**
 * Ensure the give buffer is a string, or decode the buffer contents into a string.
 * @return {string} contents of the given buffer as a string
 * @alias module:io/utils.ensureString
 */
export const ensureString = (stringOrArrayBuffer, defaultBinaryEncoding = 'utf-8') => {
  if (typeof (stringOrArrayBuffer) === 'string') {
    return stringOrArrayBuffer;
  }

  return new TextDecoder(defaultBinaryEncoding).decode(new Uint8Array(stringOrArrayBuffer));
}
