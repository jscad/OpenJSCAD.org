
const { toArray } = require('@jscad/array-utils')
const { formats } = require('./formats')
const amfSerializer = require('@jscad/amf-serializer')
const dxfSerializer = require('@jscad/dxf-serializer')
const jsonSerializer = require('@jscad/json-serializer')
const stlSerializer = require('@jscad/stl-serializer')
const svgSerializer = require('@jscad/svg-serializer')
const x3dSerializer = require('@jscad/x3d-serializer')

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
    amf: amfSerializer, // Geom3 to AMF
    stl: stlSerializer, // Geom3 to STL ASCII // NOTE: now using binary output by default !!
    stla: {
      mimeType: stlSerializer.mimeType,
      serialize: (options, data) => stlSerializer.serialize(Object.assign({}, { binary: false }, options), data)
    }, // Geom3 to STL ASCII
    stlb: stlSerializer, // Geom3 to STL BINARY
    dxf: dxfSerializer, // Geom2 to DXF
    svg: svgSerializer, // Geom2 to SVG
    x3d: x3dSerializer, // Geom3 to X3D
    json: jsonSerializer, // Geom3 or Geom2 to JSON
    js: {
      mimeType: formats.js.mimetype,
      serialize: (options, objects) => toArray(objects) // js , pass through
    },
    jscad: {
      mimeType: formats.jscad.mimetype,
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

module.exports = prepareOutput
