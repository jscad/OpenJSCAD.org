const isGeom2 = require('@jscad/modeling').geometry.geom2.isA
const isGeom3 = require('@jscad/modeling').geometry.geom3.isA

// handled format descriptions
const formats = {
  stl: {
    displayName: 'STL (Binary)',
    description: 'STereoLithography, Binary',
    extension: 'stl',
    mimetype: 'application/sla',
    convertGeom3: true,
    convertGeom2: false
  },
  stla: {
    displayName: 'STL (ASCII)',
    description: 'STereoLithography, ASCII',
    extension: 'stl',
    mimetype: 'application/sla',
    convertGeom3: true,
    convertGeom2: false
  },
  stlb: {
    displayName: 'STL (Binary)',
    description: 'STereoLithography, Binary',
    extension: 'stl',
    mimetype: 'application/sla',
    convertGeom3: true,
    convertGeom2: false
  },

  amf: {
    displayName: 'AMF (experimental)',
    description: 'Additive Manufacturing File Format',
    extension: 'amf',
    mimetype: 'application/amf+xml',
    convertGeom3: true,
    convertGeom2: false },
  x3d: {
    displayName: 'X3D',
    description: 'X3D File Format',
    extension: 'x3d',
    mimetype: 'model/x3d+xml',
    convertGeom3: true,
    convertGeom2: false },
  dxf: {
    displayName: 'DXF',
    description: 'AutoCAD Drawing Exchange Format',
    extension: 'dxf',
    mimetype: 'application/dxf',
    convertGeom3: true,
    convertGeom2: true },
  jscad: {
    displayName: 'JSCAD',
    description: 'OpenJSCAD.org Source',
    extension: 'jscad',
    mimetype: 'application/javascript',
    convertGeom3: true,
    convertGeom2: true
  },
  js: {
    displayName: 'js',
    description: 'JavaScript Source',
    extension: 'js',
    mimetype: 'application/javascript',
    convertGeom3: true,
    convertGeom2: true
  },
  svg: {
    displayName: 'SVG',
    description: 'Scalable Vector Graphics Format',
    extension: 'svg',
    mimetype: 'image/svg+xml',
    convertGeom3: false,
    convertGeom2: true
  },
  gcode: {
    displayName: 'gcode',
    description: 'G Programming Language File Format' },
  json: {
    displayName: 'json',
    description: 'JavaScript Object Notation Format' }
}

// handled input formats that can be converted to jscad code
const conversionFormats = [
// 3D file formats
  'amf',
  'gcode',
  'js',
  'jscad',
  'obj',
  'scad',
  'stl',
  'dxf',
  // 2D file formats
  'svg',
  'ttf',
  'woff'
]

// formats that can be inported
const supportedInputFormats = [
  // 3D file formats
  {
    extensions: ['stl', 'stla'],
    type: '3d',
    binary: false,
    convertableToJscad: true
  },
  {
    extensions: ['obj'],
    type: '3d',
    binary: false,
    convertableToJscad: true
  },
  {
    extensions: ['amf'],
    type: '3d',
    binary: true,
    convertableToJscad: true
  },
  {
    extensions: ['gcode'],
    type: '3d',
    binary: false,
    convertableToJscad: true
  },
  {
    extensions: ['dxf'],
    type: '3d/2d',
    binary: true,
    convertableToJscad: true
  },
  // 2D file formats
  {
    extensions: ['stl', 'stla'],
    type: '3d',
    binary: false,
    convertableToJscad: true
  },
  // script file formats
  {
    extensions: ['js'],
    type: 'script',
    binary: false,
    convertableToJscad: true
  },
  {
    extensions: ['jscad'],
    type: 'script',
    binary: false,
    convertableToJscad: true
  },
  {
    extensions: ['scad'],
    type: 'script',
    binary: false,
    convertableToJscad: true
  },
  // OpenType fonts
  {
    extensions: ['ttf'],
    type: 'font',
    binary: false,
    convertableToJscad: false
  },
  {
    extensions: ['otf'],
    type: 'font',
    binary: false,
    convertableToJscad: false
  },
  {
    extensions: ['woff'],
    type: 'font',
    binary: false,
    convertableToJscad: false
  },
  {
    extensions: ['woff2'],
    type: 'font',
    binary: false,
    convertableToJscad: false
  }

]

const supportedFormatsForObjects = objects => {
  let objectFormats = []
  let foundGeom3 = false
  let foundGeom2 = false
  for (let i = 0; i < objects.length; i++) {
    if (isGeom3(objects[i])) { foundGeom3 = true }
    if (isGeom2(objects[i])) { foundGeom2 = true }
  }
  for (let format in formats) {
    if (foundGeom3 && formats[format].convertGeom3 === true) {
      objectFormats[objectFormats.length] = format
      continue // only add once
    }
    if (foundGeom2 && formats[format].convertGeom2 === true) {
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
