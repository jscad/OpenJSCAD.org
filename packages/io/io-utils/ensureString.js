const ensureString = (stringOrArrayBuffer, defaultBinaryEncoding = 'utf-8') => {
  if (typeof (stringOrArrayBuffer) === 'string') {
    return stringOrArrayBuffer
  }

  return new TextDecoder(defaultBinaryEncoding).decode(new Uint8Array(stringOrArrayBuffer))
}

module.exports = ensureString
