import stripBom from 'strip-bom'

import { deserializers } from '@jscad/io'

// FIXME: the unregistering does not work, look into it
const registerJscadExtension = (fs, _require) => {
  _require.extensions['.jscad'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8')
    module._compile(stripBom(content), filename)
  }
}
const unRegisterJscadExtension = (fs, _require) => {
  delete _require.extensions['.jscad']
}

const registerDeserializer = (extension, fs, _require) => {
  const deserializer = deserializers[extension]
  const fileExtension = '.' + extension
  _require.extensions[fileExtension] = (module, filename) => {
    const fileReadResult = fs.readFileSync(filename) // read into buffer
    // NOTE: https://nodejs.org/api/buffer.html#bufbuffer: Buffer.buffer is not
    // guaranteed to correspond exactly to the original Buffer.
    const content = fileReadResult.buffer
      ? fileReadResult.buffer.slice(fileReadResult.byteOffset, fileReadResult.byteOffset + fileReadResult.length)
      : fileReadResult;

    const parsed = deserializer({ filename, output: 'geometry' }, content)
    module.exports = parsed
  }
}
const unregisterDeserializer = (extension, fs, _require) => {
  const fileExtension = '.' + extension
  delete _require.extensions[fileExtension]
}

export const registerAllExtensions = (fs, _require) => {
  registerJscadExtension(fs, _require)

  for (const extension of Object.keys(deserializers)) {
    registerDeserializer(extension, fs, _require)
  }
}

export const unRegisterAllExtensions = (fs, _require) => {
  unRegisterJscadExtension(fs, _require)

  for (const extension of Object.keys(deserializers)) {
    unregisterDeserializer(extension, fs, _require)
  }
}
