import { geom2, geom3, path2 } from '@jscad/modeling'

// handled format descriptions
// note: order is important as regular expressions are created from extensions
// see https://www.iana.org/assignments/media-types/media-types.xhtml
export const supportedFormats = {
  stl: {
    displayName: 'STL (Binary)',
    description: 'STereoLithography, Binary',
    extension: 'stl',
    mimetype: 'model/stl',
    deserializable: true,
    convertGeom3: false,
    convertGeom2: false
  },
  stla: {
    displayName: 'STL (ASCII)',
    description: 'STereoLithography, ASCII',
    extension: 'stl',
    mimetype: 'model/stl',
    deserializable: false, // just once
    convertGeom3: true,
    convertGeom2: false
  },
  stlb: {
    displayName: 'STL (Binary)',
    description: 'STereoLithography, Binary',
    extension: 'stl',
    mimetype: 'model/stl',
    deserializable: false, // just once
    convertGeom3: true,
    convertGeom2: false
  },
  dxf: {
    displayName: 'DXF (ASCII)',
    description: 'AutoCAD Drawing Exchange Format',
    extension: 'dxf',
    mimetype: 'image/vnd.dxf',
    deserializable: true,
    convertGeom3: true,
    convertGeom2: true
  },
  jscad: {
    displayName: 'JSCAD',
    description: 'JSCAD Design Source',
    extension: 'jscad',
    mimetype: 'application/javascript',
    deserializable: true,
    convertGeom3: true,
    convertGeom2: true
  },
  json: {
    displayName: 'json',
    description: 'JavaScript Object Notation Format',
    extension: 'json',
    mimetype: 'application/json',
    deserializable: true,
    convertGeom3: true,
    convertGeom2: true
  },
  js: {
    displayName: 'js',
    description: 'JavaScript Source',
    extension: 'js',
    mimetype: 'application/javascript',
    deserializable: true,
    convertGeom3: true,
    convertGeom2: true
  },
  obj: {
    displayName: 'OBJ',
    description: 'Wavefront OBJ File',
    extension: 'obj',
    mimetype: 'model/obj',
    deserializable: true,
    convertGeom3: true,
    convertGeom2: false
  },
  svg: {
    displayName: 'SVG',
    description: 'Scalable Vector Graphics Format',
    extension: 'svg',
    mimetype: 'image/svg+xml',
    deserializable: true,
    convertGeom3: false,
    convertGeom2: true
  },
  x3d: {
    displayName: 'X3D',
    description: 'X3D File Format',
    extension: 'x3d',
    mimetype: 'model/x3d+xml',
    deserializable: true,
    convertGeom3: true,
    convertGeom2: true
  },
  '3mf': {
    displayName: '3MF',
    description: '3D Manufacturing Format',
    extension: '3mf',
    mimetype: 'model/3mf',
    deserializable: true,
    convertGeom3: true,
    convertGeom2: false
  }
}

export const supportedFormatsForObjects = (objects) => {
  const objectFormats = []
  let found3Dsolid = false
  let found2Dsolid = false
  for (let i = 0; i < objects.length; i++) {
    if (geom3.isA(objects[i])) { found3Dsolid = true }
    if (geom2.isA(objects[i]) || path2.isA(objects[i])) { found2Dsolid = true }
  }
  for (const format in supportedFormats) {
    if (found3Dsolid && supportedFormats[format].convertGeom3 === true) {
      objectFormats[objectFormats.length] = format
      continue // only add once
    }
    if (found2Dsolid && supportedFormats[format].convertGeom2 === true) {
      objectFormats[objectFormats.length] = format
    }
  }
  return objectFormats
}

// Return a list of extensions as used by the serializers
export const supportedOutputExtensions = () => {
  const supported = []
  for (const format in supportedFormats) {
    if (supportedFormats[format].convertGeom3 === true || supportedFormats[format].convertGeom2 === true) {
      if (supported.indexOf(supportedFormats[format].extension) < 0) {
        supported.push(supportedFormats[format].extension)
      }
    }
  }
  return supported
}

// Return a list of formats as used by the serializers
export const supportedOutputFormats = () => {
  const supported = []
  for (const format in supportedFormats) {
    if (supportedFormats[format].convertGeom3 === true || supportedFormats[format].convertGeom2 === true) {
      supported.push(format)
    }
  }
  return supported
}

// Return a list of file extensions as used by the deserializers
// See also code-loading/transfromSources.js
export const supportedInputExtensions = () => {
  const supported = []
  for (const format in supportedFormats) {
    if (supportedFormats[format].deserializable === true) {
      supported.push(supportedFormats[format].extension)
    }
  }
  return supported
}

export const getMimeType = (extension) => {
  for (const format in supportedFormats) {
    const meta = supportedFormats[format]
    if (meta.extension === extension) return meta.mimetype
    if (format === extension) return meta.mimetype
  }
  return null
}

export const getExtension = (mimeType) => {
  for (const format in supportedFormats) {
    const meta = supportedFormats[format]
    if (meta.mimetype === mimeType) return meta.extension
  }
  return null
}
