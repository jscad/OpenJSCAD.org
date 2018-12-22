const fs = require('fs')
// FIXME: the unregistering does not work, look into it
const registerJscadExtension = () => {
  const stripBom = require('strip-bom')
  require.extensions['.jscad'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8')
    module._compile(stripBom(content), filename)
  }
}
const unRegisterJscadExtension = () => {
  delete require.extensions['.jscad']
}

const registerStlExtension = () => {
  const deserializer = require('@jscad/io').stlDeSerializer
  require.extensions['.stl'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8')
    const parsed = deserializer.deserialize(content, filename, { output: 'csg' })
    module.exports = parsed
  }
}
const unRegisterStlExtension = () => {
  delete require.extensions['.stl']
}

const registerAmfExtension = () => {
  const deserializer = require('@jscad/io').amfDeSerializer
  require.extensions['.amf'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8')
    const parsed = deserializer.deserialize(content, filename, { output: 'csg' })
    module.exports = parsed
  }
}
const unRegisterAmfExtension = () => {
  delete require.extensions['.amf']
}

const registerDxfExtension = () => {
  const deserializer = require('@jscad/io').dxfDeSerializer
  require.extensions['.dxf'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8')
    const parsed = deserializer.deserialize(content, filename, { output: 'csg' })
    module.exports = parsed
  }
}
const unRegisterDxfExtension = () => {
  delete require.extensions['.dxf']
}

const registerSvgExtension = () => {
  const deserializer = require('@jscad/io').svgDeSerializer
  require.extensions['.svg'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8')
    const parsed = deserializer.deserialize(content, filename, { output: 'csg' })
    module.exports = parsed
  }
}
const unRegisterSvgExtension = () => {
  delete require.extensions['.svg']
}

const registerAllExtensions = () => {
  registerJscadExtension()
  registerStlExtension()
  registerAmfExtension()
  registerDxfExtension()
  registerSvgExtension()
}

const unRegisterAllExtensions = () => {
  unRegisterJscadExtension()
  unRegisterStlExtension()
  unRegisterAmfExtension()
  unRegisterDxfExtension()
  unRegisterSvgExtension()
}

module.exports = {
  registerJscadExtension,
  registerStlExtension,
  registerAmfExtension,
  registerDxfExtension,
  registerSvgExtension,
  registerAllExtensions,
  unRegisterAllExtensions
}
