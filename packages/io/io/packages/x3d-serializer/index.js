/*
JSCAD Object to X3D (XML) Format Serialization

## License

Copyright (c) 2018 JSCAD Organization https://github.com/jscad

All code released under MIT license

Notes:
1) CAG conversion to:
     none
2) CSG conversion to:
     IndexedTriangleSet with Coordinates and Colors
3) Path2D conversion to:
     none

TBD
1) gzipped is also possible; same mime type, with file extension .x3dz
*/

//const {ensureManifoldness} = require('@jscad/io-utils')
const {isCSG} = require('@jscad/csg')
const {ensureManifoldness} = require('@jscad/io-utils')
const {toArray} = require('@jscad/io-utils/arrays')

const stringify = require('onml/lib/stringify')

// http://www.web3d.org/x3d/content/X3dTooltips.html
// http://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Meshes
// https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter13GeometryTrianglesQuadrilaterals/

const mimeType = 'model/x3d+xml'

/** Serialize the give objects to X3D (xml) format.
 * @param {Object} [options] - options for serialization
 * @param {Object|Array} objects - objects to serialize as X3D
 * @returns {Array} serialized contents, X3D format
 */
const serialize = (...params) => {
  let options = {}
  let objects
  if (params.length === 0) {
    throw new Error('no arguments supplied to serialize function !')
  } else if (params.length === 1) {
    // assumed to be object(s)
    objects = Array.isArray(params[0]) ? params[0] : params
  } else if (params.length > 1) {
    options = params[0]
    objects = params[1]
  }
  // make sure we always deal with arrays of objects as inputs
  objects = toArray(objects)

  const defaults = {
    statusCallback: null,
    unit: 'millimeter', // millimeter, inch, feet, meter or micrometer
    color: [0, 0, 1, 1.0], // default colorRGBA specification
    decimals: 1000
  }
  options = Object.assign({}, defaults, options)

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
  objects.forEach(function (object, i) {
    options.statusCallback && options.statusCallback({progress: 100 * i / objects.length})
    if (isCSG(object) && object.polygons.length > 0) {
      object = ensureManifoldness(object)
      shapes.push(convertCSG(object, options))
    }
  })
  scene = scene.concat(shapes)
  return [scene]
}

const convertCSG = (object, options) => {
  var shape = ['Shape', {}, convertMesh(object, options)]
  return shape
}

const convertMesh = (object, options) => {
  let mesh = object.toTriangles()
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

const convertToColor = (polygon, options) => {
  let color = options.color
  if (polygon.shared && polygon.shared.color) {
    color = polygon.shared.color
  } else if (polygon.color) {
    color = polygon.color
  }
  if (color.length < 4) color.push(1.0)
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

  var vertexTagToCoordIndexMap = {}
  polygons.map(function (polygon, i) {
    let polygonVertexIndices = []
    let numvertices = polygon.vertices.length
    for (var i = 0; i < numvertices; i++) {
      let vertex = polygon.vertices[i]
      // add the vertex to the list of points (and index) if not found
      if (!(vertex.getTag() in vertexTagToCoordIndexMap)) {
        let x = Math.round(vertex.pos._x * options.decimals) / options.decimals
        let y = Math.round(vertex.pos._y * options.decimals) / options.decimals
        let z = Math.round(vertex.pos._z * options.decimals) / options.decimals
        pointList.push(`${x} ${y} ${z}`)
        vertexTagToCoordIndexMap[vertex.getTag()] = pointList.length - 1
      }
      // add the index (of the vertext) to the list for this polygon
      polygonVertexIndices.push(vertexTagToCoordIndexMap[vertex.getTag()])
    }
    indexList.push(polygonVertexIndices.join(' '))
    colorList.push(convertToColor(polygon, options))
  })
  return [indexList, pointList, colorList]
}

module.exports = {
  serialize,
  mimeType
}
