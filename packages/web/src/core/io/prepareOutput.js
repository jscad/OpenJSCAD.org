const { formats } = require('@jscad/core/io/formats')

const {stlSerializer} = require('@jscad/io')
const {amfSerializer} = require('@jscad/io')
const {x3dSerializer} = require('@jscad/io')
const {svgSerializer} = require('@jscad/io')
const {jsonSerializer} = require('@jscad/io')
const {dxfSerializer} = require('@jscad/io')

function prepareOutput (objects, params) {
  const defaults = {
    format: undefined,
    version: '0.0.0'
  }
  const {format, version} = Object.assign({}, defaults, params)

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
      serialize: data => stlSerializer.serialize(data, {binary: false})
    }, // CSG to STL ASCII
    stlb: stlSerializer, // CSG to STL BINARY
    dxf: dxfSerializer, // CAG to DXF
    svg: svgSerializer, // CAG to SVG
    x3d: x3dSerializer, // CSG to X3D
    json: jsonSerializer, // CSG or CAG to JSON
    js: {
      mimeType: formats['js'].mimetype,
      serialize: object => [object] // js , pass through
    },
    jscad: {
      mimeType: formats['jscad'].mimetype,
      serialize: object => [object] // jscad , pass through
    },
    undefined: () => {
      throw new Error('Not supported : only jscad, stl, amf, dxf, svg or json as output format')
    }
  }
  const data = outputFormatHandlers[format].serialize(metaData, objects)
  const mimeType = outputFormatHandlers[format].mimeType
  return {data, mimeType}
}

module.exports = {
  prepareOutput
}
