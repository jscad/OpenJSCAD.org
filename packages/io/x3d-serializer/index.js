/*
JSCAD Object to X3D (XML) Format Serialization

## License

Copyright (c) 2018 JSCAD Organization https://github.com/jscad

All code released under MIT license

Notes:
1) geom2 conversion to:
     none
2) geom3 conversion to:
     IndexedTriangleSet with Coordinates and Colors
3) path2 conversion to:
     none

TBD
1) gzipped is also possible; same mime type, with file extension .x3dz
*/

const { geometry } = require('@jscad/csg')

const {ensureManifoldness} = require('@jscad/io-utils')

const {toArray} = require('@jscad/io-utils/arrays')

const stringify = require('onml/lib/stringify')

// http://www.web3d.org/x3d/content/X3dTooltips.html
// http://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Meshes
// https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter13GeometryTrianglesQuadrilaterals/

const mimeType = 'model/x3d+xml'

/** Serialize the give objects to X3D (xml) format.
 * @param {Object} options - options for serialization
 * @param {Object|Array} objects - objects to serialize as X3D
 * @returns {Array} serialized contents, X3D format
 */
const serialize = (options, ...objects) => {
  const defaults = {
    unit: 'millimeter', // millimeter, inch, feet, meter or micrometer
    color: [0, 0, 1, 1.0], // default colorRGBA specification
    decimals: 1000,
    statusCallback: null
  }
  options = Object.assign({}, defaults, options)

  // TODO flatten
  // objects = toArray(objects)

  options.statusCallback && options.statusCallback({progress: 0})

  // construct the contents of the XML
  var body = ['X3D',
    {
      profile: 'Interchange',
      version: '3.3',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsd:noNamespaceSchemaLocation': 'http://www.web3d.org/specifications/x3d-3.3.xsd'
    },
    ['head', {},
      ['meta',{name: 'creator', content: 'Created using JSCAD'}]
    ]
  ]
  body = body.concat(convertObjects(objects, options))

  // convert the contents to X3D (XML) format
  var contents = `<?xml version="1.0" encoding="UTF-8"?>
${stringify(body)}`

  options && options.statusCallback && options.statusCallback({progress: 100})

  return [contents]
}

const convertObjects = (objects, options) => {
  let scene = ['Scene', {}]
  let shapes = []
  objects.forEach((object, i) => {
    options.statusCallback && options.statusCallback({progress: 100 * i / objects.length})

    if (geometry.geom3.isA(object)) {
      let polygons = geometry.geom3.toPolygons(object)
      if (polygons.length > 0) {
        // TODO object = ensureManifoldness(object)
        shapes.push(convertShape(object, options))
      }
    }
  })
  scene = scene.concat(shapes)
  return [scene]
}

const convertShape = (object, options) => {
  var shape = ['Shape', {}, convertMesh(object, options)]
  return shape
}

const convertMesh = (object, options) => {
  let mesh = convertToTriangles(object, options)
  let lists = polygons2coordinates(mesh, options)

  let indexList = lists[0].join(' ')
  let pointList = lists[1].join(' ')
  let colorList = lists[2].join(' ')

  var faceset = [
    'IndexedTriangleSet',
    {ccw: 'true', colorPerVertex: 'false', solid: 'false', index: indexList},
    ['Coordinate', {point: pointList}],
    ['Color', {color: colorList}]
  ]
  return faceset
}

const convertToTriangles = (object, options) => {
  const triangles = []
  const polygons = geometry.geom3.toPolygons(object)
  polygons.forEach((poly) => {
    const firstVertex = poly.vertices[0]
    for (let i = poly.vertices.length - 3; i >= 0; i--) {
      const triangle = geometry.poly3.fromPoints([
          firstVertex,
          poly.vertices[i + 1],
          poly.vertices[i + 2]
      ])

      let color = options.color
      if (object.color) color = object.color
      if (poly.color) color = poly.color
      triangle.color = color

      triangles.push(triangle)
    }
  })
  return triangles
}

const convertToColor = (polygon, options) => {
  let color = options.color
  if (polygon.color) color = polygon.color

  return `${color[0]} ${color[1]} ${color[2]}`
}

/**
 * This function converts the given polygons into three lists
 * - indexList : index of each vertex in the triangle (tuples)
 * - pointList : coordinates of each vertex (X Y Z)
 * - colorList : color of each triangle (R G B)
 */
const polygons2coordinates = (polygons, options) => {
  var indexList = []
  var pointList = []
  var colorList = []

  var vertexTagToCoordIndexMap = new Map()
  polygons.map((polygon, i) => {
    let polygonVertexIndices = []
    let numvertices = polygon.vertices.length
    for (var i = 0; i < numvertices; i++) {
      let vertex = polygon.vertices[i]
      let id = `${vertex[0]},${vertex[1]},${vertex[2]}`

      // add the vertex to the list of points (and index) if not found
      if (! vertexTagToCoordIndexMap.has(id)) {
        let x = Math.round(vertex[0] * options.decimals) / options.decimals
        let y = Math.round(vertex[1] * options.decimals) / options.decimals
        let z = Math.round(vertex[2] * options.decimals) / options.decimals
        pointList.push(`${x} ${y} ${z}`)
        vertexTagToCoordIndexMap.set(id, pointList.length - 1)
      }
      // add the index (of the vertex) to the list for this polygon
      polygonVertexIndices.push(vertexTagToCoordIndexMap.get(id))
    }
    indexList.push(polygonVertexIndices.join(' '))
    colorList.push(convertToColor(polygon, options))
  })
  vertexTagToCoordIndexMap.clear()

  return [indexList, pointList, colorList]
}

module.exports = {
  serialize,
  mimeType
}
