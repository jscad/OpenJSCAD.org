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

const registerStlExtension = (fs, _require) => {
  const deserializer = require('@jscad/io').stlDeSerializer
  _require.extensions['.stl'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8')
    const parsed = deserializer.deserialize({ filename, output: 'geometry' }, content)
    module.exports = parsed
  }
}
const unRegisterStlExtension = (fs, _require) => {
  delete _require.extensions['.stl']
}

const registerAmfExtension = (fs, _require) => {
  const deserializer = require('@jscad/io').amfDeSerializer
  _require.extensions['.amf'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8')
    const parsed = deserializer.deserialize({ filename, output: 'geometry' }, content)
    module.exports = parsed
  }
}
const unRegisterAmfExtension = (fs, _require) => {
  delete _require.extensions['.amf']
}

const registerDxfExtension = (fs, _require) => {
  const deserializer = require('@jscad/io').dxfDeSerializer
  _require.extensions['.dxf'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8')
    const parsed = deserializer.deserialize({ filename, output: 'geometry' }, content)
    module.exports = parsed
  }
}
const unRegisterDxfExtension = (fs, _require) => {
  delete _require.extensions['.dxf']
}

const registerObjExtension = (fs, _require) => {
  const deserializer = require('@jscad/io').objDeSerializer
  _require.extensions['.obj'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8')
    const parsed = deserializer.deserialize({ filename, output: 'geometry' }, content)
    module.exports = parsed
  }
}
const unRegisterObjExtension = (fs, _require) => {
  delete _require.extensions['.obj']
}

const registerSvgExtension = (fs, _require) => {
  const deserializer = require('@jscad/io').svgDeSerializer
  _require.extensions['.svg'] = (module, filename) => {
    const content = fs.readFileSync(filename, 'utf8')
    const parsed = deserializer.deserialize({ filename, output: 'geometry' }, content)
    module.exports = parsed
  }
}
const unRegisterSvgExtension = (fs, _require) => {
  delete _require.extensions['.svg']
}

const registerAllExtensions = (fs, _require) => {
  registerJscadExtension(fs, _require)

  registerAmfExtension(fs, _require)
  registerDxfExtension(fs, _require)
  registerObjExtension(fs, _require)
  registerStlExtension(fs, _require)
  registerSvgExtension(fs, _require)
}

const unRegisterAllExtensions = (fs, _require) => {
  unRegisterJscadExtension(fs, _require)

  unRegisterAmfExtension(fs, _require)
  unRegisterDxfExtension(fs, _require)
  unRegisterObjExtension(fs, _require)
  unRegisterStlExtension(fs, _require)
  unRegisterSvgExtension(fs, _require)
}

module.exports = {
  registerJscadExtension,

  registerAmfExtension,
  registerDxfExtension,
  registerObjExtension,
  registerStlExtension,
  registerSvgExtension,

  registerAllExtensions,
  unRegisterAllExtensions
}
