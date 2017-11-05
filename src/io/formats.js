const { CSG, CAG } = require('@jscad/csg')

// handled format descriptions
const formats = {
  stl: {
    displayName: 'STL (Binary)',
    description: 'STereoLithography, Binary',
    extension: 'stl',
    mimetype: 'application/sla',
    convertCSG: true,
    convertCAG: false
  },
  stla: {
    displayName: 'STL (ASCII)',
    description: 'STereoLithography, ASCII',
    extension: 'stl',
    mimetype: 'application/sla',
    convertCSG: true,
    convertCAG: false
  },
  stlb: {
    displayName: 'STL (Binary)',
    description: 'STereoLithography, Binary',
    extension: 'stl',
    mimetype: 'application/sla',
    convertCSG: true,
    convertCAG: false
  },

  amf: {
    displayName: 'AMF (experimental)',
    description: 'Additive Manufacturing File Format',
    extension: 'amf',
    mimetype: 'application/amf+xml',
    convertCSG: true,
    convertCAG: false },
  x3d: {
    displayName: 'X3D',
    description: 'X3D File Format',
    extension: 'x3d',
    mimetype: 'model/x3d+xml',
    convertCSG: true,
    convertCAG: false },
  dxf: {
    displayName: 'DXF',
    description: 'AutoCAD Drawing Exchange Format',
    extension: 'dxf',
    mimetype: 'application/dxf',
    convertCSG: false,
    convertCAG: true },
  jscad: {
    displayName: 'JSCAD',
    description: 'OpenJSCAD.org Source',
    extension: 'jscad',
    mimetype: 'application/javascript',
    convertCSG: true,
    convertCAG: true
  },
  js: {
    displayName: 'js',
    description: 'JavaScript Source',
    extension: 'js',
    mimetype: 'application/javascript',
    convertCSG: true,
    convertCAG: true
  },
  svg: {
    displayName: 'SVG',
    description: 'Scalable Vector Graphics Format',
    extension: 'svg',
    mimetype: 'image/svg+xml',
    convertCSG: false,
    convertCAG: true
  },
  gcode: {
    displayName: 'gcode',
    description: 'G Programming Language File Format' },
  json: {
    displayName: 'json',
    description: 'JavaScript Object Notation Format' }
}

// handled input formats
const conversionFormats = [
// 3D file formats
  'amf',
  'gcode',
  'js',
  'jscad',
  'obj',
  'scad',
  'stl',
// 2D file formats
  'svg'
]

function supportedFormatsForObjects (objects) {
  let objectFormats = []
  let foundCSG = false
  let foundCAG = false
  for (let i = 0; i < objects.length; i++) {
    if (objects[i] instanceof CSG) { foundCSG = true }
    if (objects[i] instanceof CAG) { foundCAG = true }
  }
  for (let format in formats) {
    if (foundCSG && formats[format].convertCSG === true) {
      objectFormats[objectFormats.length] = format
      continue // only add once
    }
    if (foundCAG && formats[format].convertCAG === true) {
      objectFormats[objectFormats.length] = format
    }
  }
  return objectFormats
}

module.exports = {
  formats,
  conversionFormats,
  supportedFormatsForObjects
}
