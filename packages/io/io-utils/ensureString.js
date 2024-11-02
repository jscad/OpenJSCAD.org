const ensureString = (stringOrArrayBuffer, defaultBinaryEncoding) => {
  if (typeof (stringOrArrayBuffer) === 'string') {
    return stringOrArrayBuffer;
  }

  return new TextDecoder(defaultBinaryEncoding || 'utf-8').decode(new Uint8Array(stringOrArrayBuffer));
}

module.exports = ensureString;