// this is ALMOST EXACTLY the same code as openjscad.org/src/io/formats
const { isCSG, isCAG } = require('@jscad/csg')

// handled format descriptions
const formats = {
  stlb: {
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
  amf: {
    displayName: 'AMF (experimental)',
    description: 'Additive Manufacturing File Format',
    extension: 'amf',
    mimetype: 'application/amf+xml',
    convertGeom3: true,
    convertGeom2: false
  },
  x3d: {
    displayName: 'X3D',
    description: 'X3D File Format',
    extension: 'x3d',
    mimetype: 'model/x3d+xml',
    convertGeom3: true,
    convertGeom2: false
  },
  dxf: {
    displayName: 'DXF',
    description: 'AutoCAD Drawing Exchange Format',
    extension: 'dxf',
    mimetype: 'application/dxf',
    convertGeom3: false,
    convertGeom2: true
  },
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
  json: {
    displayName: 'json',
    description: 'JavaScript Object Notation Format'
  }
}

// handled input formats
const conversionFormats = [
// 3D file formats
  'amf',
  'js',
  'jscad',
  'obj',
  'scad',
  'stl',
  // 2D file formats
  'svg'
]

function supportedFormatsForObjects (objects) {
  const objectFormats = []
  let foundCSG = false
  let foundCAG = false
  for (let i = 0; i < objects.length; i++) {
    if (isCSG(objects[i])) { foundCSG = true }
    if (isCAG(objects[i])) { foundCAG = true }
  }
  for (const format in formats) {
    if (foundCSG && formats[format].convertGeom3 === true) {
      objectFormats[objectFormats.length] = format
      continue // only add once
    }
    if (foundCAG && formats[format].convertGeom2 === true) {
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
