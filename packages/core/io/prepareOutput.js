
const { toArray } = require('..//utils/arrays')
const { formats } = require('./formats')
const { stlSerializer,
  amfSerializer,
  x3dSerializer,
  svgSerializer,
  jsonSerializer,
  dxfSerializer
} = require('@jscad/io')

const prepareOutput = (objects, params) => {
  const defaults = {
    format: undefined,
    version: '0.0.0'
  }
  const { format, version } = Object.assign({}, defaults, params)

  const metaData = {
    producer: 'OpenJSCAD.org ' + version,
    date: new Date(),
    version
  }

  const outputFormatHandlers = {
    amf: amfSerializer, // CSG to AMF
    stl: stlSerializer, // CSG to STL ASCII // NOTE: now using binary output by default !!
    stla: {
      mimeType: stlSerializer.mimeType,
      serialize: (options, data) => stlSerializer.serialize(Object.assign({}, { binary: false }, options), data)
    }, // CSG to STL ASCII
    stlb: stlSerializer, // CSG to STL BINARY
    dxf: dxfSerializer, // CAG to DXF
    svg: svgSerializer, // CAG to SVG
    x3d: x3dSerializer, // CSG to X3D
    json: jsonSerializer, // CSG or CAG to JSON
    js: {
      mimeType: formats['js'].mimetype,
      serialize: (options, objects) => toArray(objects) // js , pass through
    },
    jscad: {
      mimeType: formats['jscad'].mimetype,
      serialize: (options, objects) => toArray(objects) // jscad , pass through
    },
    undefined: () => {
      throw new Error('Not supported : only jscad, stl, amf, dxf, svg or json as output format')
    }
  }
  const options = Object.assign({}, metaData)
  const data = outputFormatHandlers[format].serialize(options, objects)
  const mimeType = outputFormatHandlers[format].mimeType
  return { data, mimeType }
}

module.exports = {
  prepareOutput
}
