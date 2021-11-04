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

/**
 * Serializer of JSCAD geometries to AMF source data (XML)
 *
 * The serialization of the following geometries are possible.
 * - serialization of 3D geometry (geom3) to AMF object (a unique mesh containing both vertices and volumes)
 *
 * Colors are added to volumes when found on the 3D geometry.
 * Colors are added to triangles when found on individual polygons.
 *
 * @module io/amf-serializer
 * @example
 * const { serializer, mimeType } = require('@jscad/amf-serializer')
 */

const stringify = require('onml/lib/stringify')

const { geometries, modifiers } = require('@jscad/modeling')

const { flatten, toArray } = require('@jscad/array-utils')

const mimeType = 'application/amf+xml'

/**
 * Serialize the give objects (geometry) to AMF source data (XML).
 * @param {Object} options - options for serialization
 * @param {String} [options.unit='millimeter'] - unit of design; millimeter, inch, feet, meter or micrometer
 * @param {Function} [options.statusCallback] - call back function for progress ({ progress: 0-100 })
 * @param {...Object} objects - objects to serialize into AMF source data
 * @returns {Array} serialized contents, AMF source data(XML)
 * @alias module:io/amf-serializer.serialize
 * @example
 * const geometry = primitives.cube()
 * const amfData = serializer({unit: 'meter'}, geometry)
 */
const serialize = (options, ...objects) => {
  const defaults = {
    statusCallback: null,
    unit: 'millimeter' // millimeter, inch, feet, meter or micrometer
  }
  options = Object.assign({}, defaults, options)

  objects = flatten(objects)

  // convert only 3D geometries
  let objects3d = objects.filter((object) => geometries.geom3.isA(object))

  if (objects3d.length === 0) throw new Error('only 3D geometries can be serialized to AMF')
  if (objects.length !== objects3d.length) console.warn('some objects could not be serialized to AMF')

  // convert to triangles
  objects3d = toArray(modifiers.generalize({ snap: true, triangulate: true }, objects3d))

  options.statusCallback && options.statusCallback({ progress: 0 })

  // construct the contents of the XML
  let body = ['amf',
    {
      unit: options.unit,
      version: '1.1'
    },
    ['metadata', { type: 'author' }, 'Created by JSCAD']
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
    const polygons = geometries.geom3.toPolygons(object)
    if (polygons.length > 0) {
      options.id = i
      contents.push(convertToObject(object, options))
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
  const objectcolor = convertColor(object.color)
  const polygons = geometries.geom3.toPolygons(object)

  const contents = []

  let volume = ['volume', {}]

  // add color specification if available
  if (objectcolor) {
    volume.push(objectcolor)
  }

  let vcount = 0
  polygons.forEach((polygon) => {
    if (polygon.vertices.length < 3) {
      return
    }

    const triangles = convertToTriangles(polygon, vcount, options)

    volume = volume.concat(triangles)

    vcount += polygon.vertices.length
  })
  contents.push(volume)
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

const convertToTriangles = (polygon, index, options) => {
  const polycolor = convertToColor(polygon, options)

  // making sure they are all triangles (triangular polygons)
  const contents = []
  for (let i = 0; i < polygon.vertices.length - 2; i++) {
    if (polycolor) {
      contents.push(['triangle', {}, polycolor, ['v1', {}, index], ['v2', {}, (index + i + 1)], ['v3', {}, (index + i + 2)]])
    } else {
      contents.push(['triangle', {}, ['v1', {}, index], ['v2', {}, (index + i + 1)], ['v3', {}, (index + i + 2)]])
    }
  }
  return contents
}

module.exports = {
  serialize,
  mimeType
}
