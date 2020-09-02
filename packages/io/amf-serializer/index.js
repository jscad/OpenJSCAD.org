/*
JSCAD Object to AMF (XML) Format Serialization

## License

Copyright (c) 2018 JSCAD Organization https://github.com/jscad

All code released under MIT license

Notes:
1) geom2 conversion to:
     none
2) geom3 conversion to:
     mesh
3) path2 conversion to:
     none

TBD
1) support zip output
*/

const stringify = require('onml/lib/stringify')

// const { ensureManifoldness } = require('@jscad/io-utils')

const { geometries, utils } = require('@jscad/modeling')

const mimeType = 'application/amf+xml'

/** Serialize the give objects to AMF (xml) format.
 * @param {Object} [options] - options for serialization
 * @param {Object|Array} objects - objects to serialize as AMF
 * @returns {Array} serialized contents, AMF format
 */
const serialize = (options, ...objects) => {
  const defaults = {
    statusCallback: null,
    unit: 'millimeter', // millimeter, inch, feet, meter or micrometer
    metadata: null
  }
  options = Object.assign({}, defaults, options)

  objects = utils.flatten(objects)

  // convert only 3D geometries
  const objects3d = objects.filter((object) => geometries.geom3.isA(object))

  if (objects3d.length === 0) throw new Error('only 3D geometries can be serialized to AMF')
  if (objects.length !== objects3d.length) console.warn('some objects could not be serialized to AMF')

  options.statusCallback && options.statusCallback({ progress: 0 })

  // construct the contents of the XML
  let body = ['amf',
    {
      unit: options.unit,
      version: '1.1'
    },
    ['metadata', { type: 'author' }, 'Created using JSCAD']
  ]
  body = body.concat(translateObjects(objects3d, options))

  // convert the contents to AMF (XML) format
  const amf = `<?xml version="1.0" encoding="UTF-8"?>
${stringify(body, 2)}`

  options && options.statusCallback && options.statusCallback({ progress: 100 })

  return [amf]
}

const translateObjects = (objects, options) => {
  const contents = []
  objects.forEach((object, i) => {
    if (geometries.geom3.isA(object)) {
      const polygons = geometries.geom3.toPolygons(object)
      if (polygons.length > 0) {
        // TODO object = ensureManifoldness(object)
        options.id = i
        contents.push(convertToObject(object, options))
      }
    }
  })
  return contents
}

const convertToObject = (object, options) => {
  const contents = ['object', { id: options.id }, convertToMesh(object, options)]
  return contents
}

const convertToMesh = (object, options) => {
  let contents = ['mesh', {}, convertToVertices(object, options)]
  contents = contents.concat(convertToVolumes(object, options))
  return contents
}

/*
 * This section converts each 3D geometry to a list of vertex / coordinates
 */

const convertToVertices = (object, options) => {
  const contents = ['vertices', {}]

  const vertices = []
  const polygons = geometries.geom3.toPolygons(object)
  polygons.forEach((polygon) => {
    for (let i = 0; i < polygon.vertices.length; i++) {
      vertices.push(convertToVertex(polygon.vertices[i], options))
    }
  })

  return contents.concat(vertices)
}

const convertToVertex = (vertex, options) => {
  const contents = ['vertex', {}, convertToCoordinates(vertex, options)]
  return contents
}

const convertToCoordinates = (vertex, options) => {
  const contents = ['coordinates', {}, ['x', {}, vertex[0]], ['y', {}, vertex[1]], ['z', {}, vertex[2]]]
  return contents
}

/*
 * This section converts each 3D geometry to a list of volumes consisting of indexes into the list of vertices
 */

const convertToVolumes = (object, options) => {
  let n = 0
  const objectcolor = convertColor(object.color)
  const polygons = geometries.geom3.toPolygons(object)

  const contents = []
  polygons.forEach((polygon) => {
    if (polygon.vertices.length < 3) {
      return
    }

    let volume = ['volume', {}]
    const polycolor = convertToColor(polygon, options)
    const triangles = convertToTriangles(polygon, n)

    if (polycolor) {
      volume.push(polycolor)
    } else
    if (objectcolor) {
      volume.push(objectcolor)
    }
    volume = volume.concat(triangles)

    contents.push(volume)

    n += polygon.vertices.length
  })
  return contents
}

const convertColor = (color) => {
  if (color) {
    if (color.length < 4) color.push(1.0)
    return ['color', {}, ['r', {}, color[0]], ['g', {}, color[1]], ['b', {}, color[2]], ['a', {}, color[3]]]
  }
  return null
}

const convertToColor = (polygon, options) => {
  const color = polygon.color
  return convertColor(color)
}

const convertToTriangles = (polygon, index) => {
  const contents = []

  // making sure they are all triangles (triangular polygons)
  for (let i = 0; i < polygon.vertices.length - 2; i++) {
    const triangle = ['triangle', {}, ['v1', {}, index], ['v2', {}, (index + i + 1)], ['v3', {}, (index + i + 2)]]
    contents.push(triangle)
  }
  return contents
}

module.exports = {
  serialize,
  mimeType
}
