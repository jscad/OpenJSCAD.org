/*
JSCAD Object to AutoCAD DXF Entity Serialization

## License

Copyright (c) 2018 Z3 Development https://github.com/z3dev

All code released under MIT license

Notes:
1) geom2 conversion to:
     POLYLINE
     LWPOLYLINE
2) geom3 conversion to:
     3DFACE
     POLYLINE (face mesh)
3) path2 conversion to:
     LWPOLYLINE
TBD
1) support binary output
2) add color conversion
*/

const { geometries, modifiers } = require('@jscad/modeling')
const { geom3, geom2, path2 } = geometries

const { flatten, toArray } = require('@jscad/array-utils')

const { dxfHeaders, dxfClasses, dxfTables, dxfBlocks, dxfObjects } = require('./autocad_AC2017')
const colorindex2017 = require('./colorindex2017')

const mimeType = 'application/dxf'

/**
 * Serializer of JSCAD geometries to DXF entities.
 * @module io/dxf-serializer
 * @example
 * const { serializer, mimeType } = require('@jscad/dxf-serializer')
 */

/**
 * Serialize the give objects to AutoCad DXF format.
 * @param {Object} options - options for serialization, REQUIRED
 * @param {String} [options.geom2To='lypolyline'] - target entity for 2D geometries, 'lwpolyline' or 'polyline'
 * @param {String} [options.geom3To='3dface'] - target entity for 3D geometries, '3dface' or 'polyline'
 * @param {Object|Array} objects - objects to serialize as DXF
 * @returns {Array} serialized contents, DXF format
 * @alias module:io/dxf-serializer.serialize
 * @example
 * const geometry = primitives.cube()
 * const dxfData = serializer({geom3To: '3dface'}, geometry)
 */
const serialize = (options, ...objects) => {
  const defaults = {
    geom2To: 'lwpolyline', // or polyline
    geom3To: '3dface', // or polyline
    pathTo: 'lwpolyline',
    statusCallback: null,
    colorIndex: colorindex2017
  }
  options = Object.assign({}, defaults, options)

  options.entityId = 0 // sequence id for entities created

  objects = flatten(objects)

  objects = objects.filter((object) => geom3.isA(object) || geom2.isA(object) || path2.isA(object))

  if (objects.length === 0) throw new Error('only JSCAD geometries can be serialized to DXF')

  // convert to triangles
  objects = toArray(modifiers.generalize({ snap: true, triangulate: true }, objects))

  const dxfContent = `999
Created by JSCAD
${dxfHeaders(options)}
${dxfClasses(options)}
${dxfTables(options)}
${dxfBlocks(options)}
${dxfEntities(objects, options)}
${dxfObjects(options)}
  0
EOF
`
  return [dxfContent]
}

/**
 * Serialize the given objects as a DXF entity section
 * @param {Array} objects - objects to serialize as DXF
 * @param {Object} options - options for serialization
 * @returns {Object} serialized contents, DXF format
 */
const dxfEntities = (objects, options) => {
  const entityContents = objects.map((object, i) => {
    if (geom2.isA(object)) {
      const color = object.color
      const name = object.name
      const outlines = geom2.toOutlines(object)
      const paths = outlines.map((outline) => ({ closed: true, points: outline, color, name }))
      if (options.geom2To === 'polyline') {
        return PathsToPolyine(paths, options)
      }
      return PathsToLwpolyline(paths, options)
    }
    if (geom3.isA(object)) {
      // TODO object = ensureManifoldness(object)
      if (options.geom3To === 'polyline') {
        return PolygonsToPolyline(object, options)
      }
      return PolygonsTo3DFaces(object, options)
    }
    if (path2.isA(object)) {
      // mimic a path (outline) from geom2
      const color = object.color
      const name = object.name
      const path = { closed: object.isClosed, points: path2.toPoints(object), color, name }
      return PathsToLwpolyline([path], options)
    }
    return ''
  })
  let section = `  0
SECTION
  2
ENTITIES
`
  entityContents.forEach((content) => {
    if (content) {
      section += content
    }
  })
  section += `  0
ENDSEC`
  return section
}

//
// convert the given paths (from 2D outlines) to DXF lwpolyline entities
// @return array of strings
//
// Group Codes Used:
// 5 - Handle, unique HEX value, e.g. 5C6
// 8 - layer name (0 is default layer)
// 67 (0 - model space, 1 - paper space)
// 100 -
//
const PathsToLwpolyline = (paths, options) => {
  options.statusCallback && options.statusCallback({ progress: 0 })
  let str = ''
  paths.forEach((path, i) => {
    if (path.points.length < 1) return
    const numpointsClosed = path.points.length + (path.closed ? 1 : 0)
    str += `  0
LWPOLYLINE
  5
${getEntityId(options)}
  100
AcDbEntity
  3
${getName(path, options)}
  8
0
  67
0
  62
${getColorNumber(path, options)}
  100
AcDbPolyline
  90
${numpointsClosed}
  70
${(path.closed ? 1 : 0)}
`
    for (let pointindex = 0; pointindex < numpointsClosed; pointindex++) {
      let pointindexwrapped = pointindex
      if (pointindexwrapped >= path.points.length) pointindexwrapped -= path.points.length
      const point = path.points[pointindexwrapped]
      str += `  10
${point[0]}
  20
${point[1]}
`
    }
    options.statusCallback && options.statusCallback({ progress: 100 * i / paths.length })
  })
  options.statusCallback && options.statusCallback({ progress: 100 })
  return [str]
}

//
// convert the given paths (from outlines) to DXF polyline (2D line) entities
// @return array of strings
//
const PathsToPolyine = (paths, options) => {
  options.statusCallback && options.statusCallback({ progress: 0 })
  let str = ''
  paths.forEach((path, i) => {
    const numpointsClosed = path.points.length + (path.closed ? 1 : 0)
    str += `  0
POLYLINE
  5
${getEntityId(options)}
  100
AcDbEntity
  3
${getName(path, options)}
  8
0
  62
${getColorNumber(path, options)}
  100
AcDb2dPolyline
`
    for (let pointindex = 0; pointindex < numpointsClosed; pointindex++) {
      let pointindexwrapped = pointindex
      if (pointindexwrapped >= path.points.length) pointindexwrapped -= path.points.length
      const point = path.points[pointindexwrapped]
      str += `  0
VERTEX
  5
${getEntityId(options)}
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb2dVertex
 10
${point[0]}
 20
${point[1]}
`
    }
    str += `  0
SEQEND
  5
${getEntityId(options)}
  100
AcDbEntity
`
    options.statusCallback && options.statusCallback({ progress: 100 * i / paths.length })
  })
  options.statusCallback && options.statusCallback({ progress: 100 })
  return [str]
}

//
// convert the given object (geom3) to DXF 3D face entities
// @return array of strings
//
const PolygonsTo3DFaces = (object, options) => {
  options.statusCallback && options.statusCallback({ progress: 0 })
  let str = ''
  const polygons = geom3.toPolygons(object)
  const objectColor = getColorNumber(object, options)
  polygons.forEach((polygon, i) => {
    const polyColor = polygon.color ? getColorNumber(polygon, options) : objectColor
    const triangles = polygonToTriangles(polygon)
    triangles.forEach((triangle, i) => {
      str += triangleTo3DFaces(triangle, options, polyColor)
    })
  })
  options.statusCallback && options.statusCallback({ progress: 100 })
  return [str]
}

//
// convert the given polygon to triangles
//
// NOTE: This only works for CONVEX polygons
const polygonToTriangles = (polygon) => {
  const length = polygon.vertices.length - 2
  if (length < 1) return []

  const pivot = polygon.vertices[0]
  const triangles = []
  for (let i = 0; i < length; i++) {
    triangles.push([pivot, polygon.vertices[i + 1], polygon.vertices[i + 2]])
  }
  return triangles
}

//
// convert the given triangle to DXF 3D face entity
//
const triangleTo3DFaces = (triangle, options, color) => {
  const corner10 = triangle[0]
  const corner11 = triangle[1]
  const corner12 = triangle[2]
  const corner13 = triangle[2] // same in DXF
  const str = `  0
3DFACE
  5
${getEntityId(options)}
  100
AcDbEntity
  8
0
  62
${color}
  100
AcDbFace
  70
0
  10
${corner10[0]}
  20
${corner10[1]}
  30
${corner10[2]}
  11
${corner11[0]}
  21
${corner11[1]}
  31
${corner11[2]}
  12
${corner12[0]}
  22
${corner12[1]}
  32
${corner12[2]}
  13
${corner13[0]}
  23
${corner13[1]}
  33
${corner13[2]}
`
  return str
}

// convert the given object (geom3) to DXF POLYLINE (polyface mesh)
// FIXME The entity types are wrong, resulting in imterpretation as a 3D lines, not faces
// @return array of strings
const PolygonsToPolyline = (object, options) => {
  let str = ''
  const mesh = polygons2polyfaces(geom3.toPolygons(object))
  if (mesh.faces.length > 0) {
    str += `  0
POLYLINE
  5
${getEntityId(options)}
  100
AcDbEntity
  3
${getName(object, options)}
  8
0
  62
${getColorNumber(object, options)}
  100
AcDb3dPolyline
  70
64
  71
${mesh.vertices.length}
  72
${mesh.faces.length}
`
    mesh.vertices.forEach((vertex) => {
      str += `  0
VERTEX
  5
${getEntityId(options)}
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
${vertex[0]}
  20
${vertex[1]}
  30
${vertex[2]}
  70
192
`
    })
    mesh.faces.forEach((face) => {
      str += `  0
VERTEX
  5
${getEntityId(options)}
  100
AcDbEntity
  8
0
  100
AcDbVertex
  100
AcDb3dPolylineVertex
  10
0
  20
0
  30
0
  70
128
  71
${face[0]}
  72
${face[1]}
  73
${face[2]}
  74
${face[3]}
`
    })
  }
  return [str]
}

// convert the given polygons to polyfaces (DXF)
// @return array of faces, array of vertices
const polygons2polyfaces = (polygons) => {
  const faces = []
  const vertices = []
  for (let i = 0; i < polygons.length; ++i) {
    const polygon = polygons[i]
    const face = []
    for (let j = 0; j < polygon.vertices.length; ++j) {
      const vv = polygon.vertices[j]
      vertices.push([vv[0], vv[1], vv[2]])
      face.push(vertices.length)
    }
    while (face.length < 4) { face.push(0) }
    faces.push(face)
  }
  return { faces: faces, vertices: vertices }
}

// get a unique id for a DXF entity
// @return unique id string
const getEntityId = (options) => {
  options.entityId++
  // add more zeros if the id needs to be larger
  const padded = '00000' + options.entityId.toString(16).toUpperCase()
  return 'CAD' + padded.substr(padded.length - 5)
}

const getName = (object, options) => {
  if (object.name) return object.name
  // add more zeros if the id needs to be larger
  const padded = '00000' + options.entityId.toString(16).toUpperCase()
  return 'CAD' + padded.substr(padded.length - 5)
}

const getColorNumber = (object, options) => {
  let colorNumber = 256
  if (object.color) {
    const r = Math.floor(object.color[0] * 255)
    const g = Math.floor(object.color[1] * 255)
    const b = Math.floor(object.color[2] * 255)
    // find the closest Autocad color number
    const index = options.colorIndex
    let closest = 255 + 255 + 255
    for (let i = 1; i < index.length; i++) {
      const rgb = index[i]
      const diff = Math.abs(r - rgb[0]) + Math.abs(g - rgb[1]) + Math.abs(b - rgb[2])
      if (diff < closest) {
        colorNumber = i
        if (diff === 0) break
        closest = diff
      }
    }
  }
  return colorNumber
}

module.exports = {
  serialize,
  mimeType
}
