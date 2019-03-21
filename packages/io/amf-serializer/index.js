/*
JSCAD Object to AMF (XML) Format Serialization

## License

Copyright (c) 2018 JSCAD Organization https://github.com/jscad

All code released under MIT license

Notes:
1) CAG conversion to:
     none
2) CSG conversion to:
     mesh
3) Path2D conversion to:
     none

TBD
1) support zip output
*/

const {isCSG} = require('@jscad/csg')
const {ensureManifoldness} = require('@jscad/io-utils')
const {toArray} = require('@jscad/io-utils/arrays')
const stringify = require('onml/lib/stringify')

const mimeType = 'application/amf+xml'

/** Serialize the give objects to AMF (xml) format.
 * @param {Object} [options] - options for serialization
 * @param {Object|Array} objects - objects to serialize as AMF
 * @returns {Array} serialized contents, AMF format
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
    metadata: null
  }
  options = Object.assign({}, defaults, options)

  options.statusCallback && options.statusCallback({progress: 0})

  // construct the contents of the XML
  var body = ['amf',
    {
      unit: options.unit,
      version: '1.1'
    },
    ['metadata', {type: 'author'}, 'Created using JSCAD']
  ]
  body = body.concat(translateObjects(objects, options))

  // convert the contents to AMF (XML) format
  var amf = `<?xml version="1.0" encoding="UTF-8"?>
${stringify(body)}`

  options && options.statusCallback && options.statusCallback({progress: 100})

  return [amf]
}

const translateObjects = (objects, options) => {
  let contents = []
  objects.forEach(function (object, i) {
    if (isCSG(object) && object.polygons.length > 0) {
      object = ensureManifoldness(object)
      options.id = i
      contents.push(convertCSG(object, options))
    }
  })
  return contents
}

const convertCSG = (object, options) => {
  var contents = ['object', {id: options.id}, convertToMesh(object, options)]
  return contents
}

const convertToMesh = (object, options) => {
  var contents = ['mesh', {}, convertToVertices(object, options)]
  contents = contents.concat(convertToVolumes(object, options))
  return contents
}

/*
 * This section converts each CSG object to a list of vertex / coordinates
 */

const convertToVertices = (object, options) => {
  var contents = ['vertices', {}]

  let vertices = []
  object.polygons.forEach(function (polygon) {
    for (let i = 0; i < polygon.vertices.length; i++) {
      vertices.push(convertToVertex(polygon.vertices[i], options))
    }
  })

  return contents.concat(vertices)
}

const convertToVertex = (vertex, options) => {
  let contents = ['vertex', {}, convertToCoordinates(vertex, options)]
  return contents
}

const convertToCoordinates = (vertex, options) => {
  let position = vertex.pos
  let contents = ['coordinates', {}, ['x', {}, position._x], ['y', {}, position._y], ['z', {}, position._z]]
  return contents
}

/*
 * This section converts each CSG object to a list of volumes consisting of indexes into the list of vertices
 */

const convertToVolumes = (object, options) => {
  let contents = []

  let n = 0
  object.polygons.forEach(function (polygon) {
    if (polygon.vertices.length < 3) {
      return
    }

    let volume = ['volume', {}]
    let color = convertToColor(polygon, options)
    let triangles = convertToTriangles(polygon, n)

    if (color) {
      volume.push(color)
    }
    volume = volume.concat(triangles)

    contents.push(volume)

    n += polygon.vertices.length
  })
  return contents
}

const convertToColor = (polygon, options) => {
  let color = null
  if (polygon.shared && polygon.shared.color) {
    color = polygon.shared.color
  } else if (polygon.color) {
    color = polygon.color
  }
  if (color != null) {
    if (color.length < 4) color.push(1.0)
    return ['color', {}, ['r', {}, color[0]], ['g', {}, color[1]], ['b', {}, color[2]], ['a', {}, color[3]]]
  }
  return null
}

const convertToTriangles = (polygon, index) => {
  let contents = []

  // making sure they are all triangles (triangular polygons)
  for (var i = 0; i < polygon.vertices.length - 2; i++) {
    let triangle = ['triangle', {}, ['v1', {}, index], ['v2', {}, (index + i + 1)], ['v3', {}, (index + i + 2)]]
    contents.push(triangle)
  }
  return contents
}

module.exports = {
  serialize,
  mimeType
}
