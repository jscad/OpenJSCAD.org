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

/**
 * Serializer of JSCAD geometries to X3D elements.
 * @module io/x3d-serializer
 * @example
 * const { serializer, mimeType } = require('@jscad/x3d-serializer')
 */

const { geometries, modifiers } = require('@jscad/modeling')

const { flatten, toArray } = require('@jscad/array-utils')

const stringify = require('onml/lib/stringify')

// http://www.web3d.org/x3d/content/X3dTooltips.html
// http://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Meshes
// https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter13GeometryTrianglesQuadrilaterals/

const mimeType = 'model/x3d+xml'

/**
 * Serialize the give objects to X3D elements (XML).
 * @param {Object} options - options for serialization, REQUIRED
 * @param {String} [options.unit='millimeter'] - unit of design; millimeter, inch, feet, meter or micrometer
 * @param {Function} [options.statusCallback] - call back function for progress ({ progress: 0-100 })
 * @param {Object|Array} objects - objects to serialize as X3D
 * @returns {Array} serialized contents, X3D format (XML)
 * @alias module:io/x3d-serializer.serialize
 * @example
 * const geometry = primitives.cube()
 * const x3dData = serializer({unit: 'meter'}, geometry)
 */
const serialize = (options, ...objects) => {
  const defaults = {
    unit: 'millimeter', // millimeter, inch, feet, meter or micrometer
    color: [0, 0, 1, 1.0], // default colorRGBA specification
    decimals: 1000,
    statusCallback: null
  }
  options = Object.assign({}, defaults, options)

  objects = flatten(objects)

  // convert only 3D geometries
  let objects3d = objects.filter((object) => geometries.geom3.isA(object))

  if (objects3d.length === 0) throw new Error('only 3D geometries can be serialized to X3D')
  if (objects.length !== objects3d.length) console.warn('some objects could not be serialized to X3D')

  // covert to triangles
  objects3d = toArray(modifiers.generalize({ snap: true, triangulate: true }, objects3d))

  options.statusCallback && options.statusCallback({ progress: 0 })

  // construct the contents of the XML
  let body = ['X3D',
    {
      profile: 'Interchange',
      version: '3.3',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsd:noNamespaceSchemaLocation': 'http://www.web3d.org/specifications/x3d-3.3.xsd'
    },
    ['head', {},
      ['meta', { name: 'creator', content: 'Created by JSCAD' }]
    ]
  ]
  body = body.concat(convertObjects(objects3d, options))

  // convert the contents to X3D (XML) format
  const contents = `<?xml version="1.0" encoding="UTF-8"?>
${stringify(body, 2)}`

  options && options.statusCallback && options.statusCallback({ progress: 100 })

  return [contents]
}

const convertObjects = (objects, options) => {
  let scene = ['Scene', {}]
  const shapes = []
  objects.forEach((object, i) => {
    options.statusCallback && options.statusCallback({ progress: 100 * i / objects.length })

    if (geometries.geom3.isA(object)) {
      const polygons = geometries.geom3.toPolygons(object)
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
  const shape = ['Shape', {}, convertMesh(object, options)]
  return shape
}

const convertMesh = (object, options) => {
  const mesh = convertToTriangles(object, options)
  const lists = polygons2coordinates(mesh, options)

  const indexList = lists[0].join(' ')
  const pointList = lists[1].join(' ')
  const colorList = lists[2].join(' ')

  const faceset = [
    'IndexedTriangleSet',
    { ccw: 'true', colorPerVertex: 'false', solid: 'false', index: indexList },
    ['Coordinate', { point: pointList }],
    ['Color', { color: colorList }]
  ]
  return faceset
}

const convertToTriangles = (object, options) => {
  const triangles = []
  const polygons = geometries.geom3.toPolygons(object)
  polygons.forEach((poly) => {
    const firstVertex = poly.vertices[0]
    for (let i = poly.vertices.length - 3; i >= 0; i--) {
      const triangle = geometries.poly3.fromPoints([
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
  const indexList = []
  const pointList = []
  const colorList = []

  const vertexTagToCoordIndexMap = new Map()
  polygons.forEach((polygon) => {
    const polygonVertexIndices = []
    const numvertices = polygon.vertices.length
    for (let i = 0; i < numvertices; i++) {
      const vertex = polygon.vertices[i]
      const id = `${vertex[0]},${vertex[1]},${vertex[2]}`

      // add the vertex to the list of points (and index) if not found
      if (!vertexTagToCoordIndexMap.has(id)) {
        const x = Math.round(vertex[0] * options.decimals) / options.decimals
        const y = Math.round(vertex[1] * options.decimals) / options.decimals
        const z = Math.round(vertex[2] * options.decimals) / options.decimals
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
