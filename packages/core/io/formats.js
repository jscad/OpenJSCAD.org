const isGeom2 = require('@jscad/modeling').geometry.geom2.isA
const isGeom3 = require('@jscad/modeling').geometry.geom3.isA

// handled format descriptions
const formats = {
  stl: {
    displayName: 'STL (Binary)',
    description: 'STereoLithography, Binary',
    extension: 'stl',
    mimetype: 'application/sla',
    deserializable: true,
    convertGeom3: false,
    convertGeom2: false },
  stla: {
    displayName: 'STL (ASCII)',
    description: 'STereoLithography, ASCII',
    extension: 'stl',
    mimetype: 'application/sla',
    deserializable: false, // just once
    convertGeom3: true,
    convertGeom2: false },
  stlb: {
    displayName: 'STL (Binary)',
    description: 'STereoLithography, Binary',
    extension: 'stl',
    mimetype: 'application/sla',
    deserializable: false, // just once
    convertGeom3: true,
    convertGeom2: false },
  amf: {
    displayName: 'AMF (experimental)',
    description: 'Additive Manufacturing File Format',
    extension: 'amf',
    mimetype: 'application/amf+xml',
    deserializable: true,
    convertGeom3: true,
    convertGeom2: false },
  dxf: {
    displayName: 'DXF (ASCII)',
    description: 'AutoCAD Drawing Exchange Format',
    extension: 'dxf',
    mimetype: 'application/dxf',
    deserializable: true,
    convertGeom3: true,
    convertGeom2: true },
  gcode: {
    displayName: 'GCODE',
    description: 'G Programming Language File Format',
    extension: 'gcode',
    mimetype: 'application/octet-stream',
    deserializable: false,
    convertGeom3: false,
    convertGeom2: false },
  jscad: {
    displayName: 'JSCAD',
    description: 'OpenJSCAD.org Source',
    extension: 'jscad',
    mimetype: 'application/javascript',
    deserializable: true,
    convertGeom3: true,
    convertGeom2: true },
  js: {
    displayName: 'js',
    description: 'JavaScript Source',
    extension: 'js',
    mimetype: 'application/javascript',
    deserializable: true,
    convertGeom3: true,
    convertGeom2: true },
  obj: {
    displayName: 'OBJ',
    description: 'Wavefromt OBJ File Format',
    extension: 'obj',
    mimetype: 'text/plain',
    deserializable: true,
    convertGeom3: false,
    convertGeom2: false },
  svg: {
    displayName: 'SVG',
    description: 'Scalable Vector Graphics Format',
    extension: 'svg',
    mimetype: 'image/svg+xml',
    deserializable: true,
    convertGeom3: false,
    convertGeom2: true },
  x3d: {
    displayName: 'X3D',
    description: 'X3D File Format',
    extension: 'x3d',
    mimetype: 'model/x3d+xml',
    deserializable: false,
    convertGeom3: true,
    convertGeom2: false },
  json: {
    displayName: 'json',
    description: 'JavaScript Object Notation Format',
    extension: 'json',
    mimetype: 'application/json',
    deserializable: false,
    convertGeom3: false,
    convertGeom2: false }
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
// FIXME unused and not exported
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

// Return a list of extensions as used by the serializers
const supportedOutputExtensions = () => {
  let supported = []
  for (let format in formats) {
    if (formats[format].convertGeom3 === true || formats[format].convertGeom2 === true) {
      if (supported.indexOf(formats[format].extension) < 0) {
        supported.push(formats[format].extension)
      }
    }
  }
  return supported
}

// Return a list of formats as used by the serializers
const supportedOutputFormats = () => {
  let supported = []
  for (let format in formats) {
    if (formats[format].convertGeom3 === true || formats[format].convertGeom2 === true) {
      supported.push(format)
    }
  }
  return supported
}

// Return a list of file extensions as used by the deserializers
// See also code-loading/transfromSources.js
const supportedInputExtensions = () => {
  let supported = []
  for (let format in formats) {
    if (formats[format].deserializable === true) {
      supported.push(formats[format].extension)
    }
  }
  return supported
}

module.exports = {
  formats,
  conversionFormats,
  supportedInputExtensions,
  supportedOutputExtensions,
  supportedOutputFormats,
  supportedFormatsForObjects
}
