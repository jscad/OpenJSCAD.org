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

const { geometry, utils } = require('@jscad/modeling')

const { ensureManifoldness } = require('@jscad/io-utils')

const { dxfHeaders, dxfClasses, dxfTables, dxfBlocks, dxfObjects } = require('./autocad_AC2017')

const mimeType = 'application/dxf'

/** Serialize the give objects to AutoCad DXF format.
 * @param {Object} options - options for serialization, REQUIRED
 * @param {Object|Array} objects - objects to serialize as DXF
 * @returns {Array} serialized contents, DXF format
 */
const serialize = (options, ...objects) => {
  const defaults = {
    cagTo: 'lwpolyline', // or polyline
    csgTo: '3dface', // or polyline
    pathTo: 'lwpolyline',
    entityId: 0,
    statusCallback: null
  }
  options = Object.assign({}, defaults, options)

  if (objects.length === 0) {
    throw new Error('no arguments supplied to serialize function !')
  }

  objects = utils.flatten(objects)

  let dxfContent = `999
DXF generated by JSCAD
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

/** Serialize the given objects as a DXF entity section
 * @param {Array} objects - objects to serialize as DXF
 * @param {Object} options - options for serialization
 * @returns {Object} serialized contents, DXF format
 */
const dxfEntities = (objects, options) => {
  let entityContents = objects.map((object, i) => {
    if (geometry.geom2.isA(object)) {
      let outlines = geometry.geom2.toOutlines(object)
      let paths = outlines.map((outline) => { return { closed: true, points: outline } })
      if (options.cagTo === 'polyline') {
        return PathsToPolyine(paths, options)
      }
      return PathsToLwpolyine(paths, options)
    }
    if (geometry.geom3.isA(object)) {
      // TODO object = ensureManifoldness(object)
      if (options.csgTo === 'polyline') {
        return PolygonsToPolyline(object, options)
      }
      return PolygonsTo3DFaces(object, options)
    }
    if (geometry.path2.isA(object)) {
      // mimic a path (outline) from geom2
      let path = { closed: object.isClosed, points: geometry.path2.toPoints(object) }
      return PathsToLwpolyine([path], options)
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
const PathsToLwpolyine = (paths, options) => {
  options.statusCallback && options.statusCallback({ progress: 0 })
  let str = ''
  paths.forEach((path, i) => {
    if (path.points.length < 1) return
    let numpointsClosed = path.points.length + (path.closed ? 1 : 0)
    str += `  0
LWPOLYLINE
  5
${getEntityId(options)}
  100
AcDbEntity
  8
0
  67
0
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
      let point = path.points[pointindexwrapped]
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
    let numpointsClosed = path.points.length + (path.closed ? 1 : 0)
    str += `  0
POLYLINE
  5
${getEntityId(options)}
  100
AcDbEntity
  8
0
  100
AcDb2dPolyline
`
    for (let pointindex = 0; pointindex < numpointsClosed; pointindex++) {
      let pointindexwrapped = pointindex
      if (pointindexwrapped >= path.points.length) pointindexwrapped -= path.points.length
      let point = path.points[pointindexwrapped]
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
// convert the given object to DXF 3D face entities
// @return array of strings
//
const PolygonsTo3DFaces = (object, options) => {
  options.statusCallback && options.statusCallback({ progress: 0 })
  let str = ''
  object.polygons.forEach((polygon, i) => {
    let triangles = polygonToTriangles(polygon)
    triangles.forEach((triangle, i) => {
      str += triangleTo3DFaces(triangle, options)
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
  let length = polygon.vertices.length - 2
  if (length < 1) return []

  let pivot = polygon.vertices[0]
  let triangles = []
  for (let i = 0; i < length; i++) {
    triangles.push([pivot, polygon.vertices[i + 1], polygon.vertices[i + 2]])
  }
  return triangles
}

//
// convert the given triangle to DXF 3D face entity
//
const triangleTo3DFaces = (triangle, options) => {
  let corner10 = triangle[0]
  let corner11 = triangle[1]
  let corner12 = triangle[2]
  let corner13 = triangle[2] // same in DXF
  let str = `  0
3DFACE
  5
${getEntityId(options)}
  100
AcDbEntity
  8
0
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

// convert the given object to DXF POLYLINE (polyface mesh)
// FIXME The entity types are wrong, resulting in imterpretation as a 3D lines, not faces
// @return array of strings
const PolygonsToPolyline = (object, options) => {
  let str = ''
  let mesh = polygons2polyfaces(object.polygons)
  if (mesh.faces.length > 0) {
    str += `  0
POLYLINE
  5
${getEntityId(options)}
  100
AcDbEntity
  8
0
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
  let faces = []
  let vertices = []
  for (let i = 0; i < polygons.length; ++i) {
    let polygon = polygons[i]
    let face = []
    for (let j = 0; j < polygon.vertices.length; ++j) {
      let vv = polygon.vertices[j]
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
  let padded = '00000' + options.entityId.toString(16).toUpperCase()
  return 'CAD' + padded.substr(padded.length - 5)
}

module.exports = {
  serialize,
  mimeType
}
