const { deserializers } = require('@jscad/io')

// FIXME: the unregistering does not work, look into it
const registerJscadExtension = (fs, _require) => {
  const stripBom = require('strip-bom')
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
    const content = fs.readFileSync(filename, 'utf8')
    const parsed = deserializer({ filename, output: 'geometry' }, content)
    module.exports = parsed
  }
}
const unregisterDeserializer = (extension, fs, _require) => {
  const fileExtension = '.' + extension
  delete _require.extensions[fileExtension]
}

const registerAllExtensions = (fs, _require) => {
  registerJscadExtension(fs, _require)

  for (const extension of Object.keys(deserializers)) {
    registerDeserializer(extension, fs, _require)
  }
}

const unRegisterAllExtensions = (fs, _require) => {
  unRegisterJscadExtension(fs, _require)

  for (const extension of Object.keys(deserializers)) {
    unregisterDeserializer(extension, fs, _require)
  }
}

module.exports = {
  registerAllExtensions,
  unRegisterAllExtensions
}
