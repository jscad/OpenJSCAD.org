const { formats } = require('./formats')
const {convertToSolid2} = require('../core/convertToSolid')

const {stlSerializer} = require('@jscad/io')
const {amfSerializer} = require('@jscad/io')
const {x3dSerializer} = require('@jscad/io')
const {svgSerializer} = require('@jscad/io')
const {jsonSerializer} = require('@jscad/io')
const {dxfSerializer} = require('@jscad/io')

function prepareOutput (objects, params) {
  const {format, version = '0.0.0'} = params

  let object

  if (format === 'jscad' || format === 'js') {
    object = objects
  } else {
    const formatInfo = formats[format]
    object = convertToSolid2(objects, formatInfo)
  }

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
  const data = outputFormatHandlers[format].serialize(object, metaData)
  const mimeType = outputFormatHandlers[format].mimeType
  return {data, mimeType}
}

module.exports = {
  prepareOutput
}
