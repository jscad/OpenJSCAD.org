/*
JSCAD Object to X3D (XML) Format Serialization

## License

Copyright (c) 2018-2022 JSCAD Organization https://github.com/jscad

All code released under MIT license

Notes:
1) geom2 conversion to:
     Polyline2D with lineSegment and Color
2) geom3 conversion to:
     IndexedTriangleSet with Coordinates and Colors
3) path2 conversion to:
     Polyline2D with lineSegment and Color
*/

/**
 * Serializer of JSCAD geometries to X3D source data (XML).
 *
 * The serialization of the following geometries are possible.
 * - serialization of 3D geometries (geom3) to X3D IndexedTriangleSet (a unique mesh containing coordinates)
 * - serialization of 2D geometries (geom2) to X3D Polyline2D
 * - serialization of 2D paths (path2) to X3D Polyline2D
 *
 * Material (color) is added to X3D shapes when found on the geometry.
 *
 * @module io/x3d-serializer
 * @example
 * const { serializer, mimeType } = require('@jscad/x3d-serializer')
 */

const { geometries, modifiers } = require('@jscad/modeling')
const { geom2, geom3, path2, poly2, poly3 } = geometries

const { flatten } = require('@jscad/array-utils')

const stringify = require('onml/lib/stringify')

// http://www.web3d.org/x3d/content/X3dTooltips.html
// http://www.web3d.org/x3d/content/examples/X3dSceneAuthoringHints.html#Meshes
// https://x3dgraphics.com/examples/X3dForWebAuthors/Chapter13GeometryTrianglesQuadrilaterals/

const mimeType = 'model/x3d+xml'
const defNames = new Map()

/**
 * Serialize the give objects to X3D elements (XML).
 * @param {Object} options - options for serialization, REQUIRED
 * @param {Array} [options.color=[0,0,1,1]] - default color for objects
 * @param {Number} [options.shininess=8/256] - x3d shininess for specular highlights
 * @param {Boolean} [options.smooth=false] - use averaged vertex normals
 * @param {Number} [options.decimals=1000] - multiplier before rounding to limit precision
 * @param {Boolean} [options.metadata=true] - add metadata to 3MF contents, such at CreationDate
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
    color: [0, 0, 1, 1.0], // default colorRGBA specification
    shininess: 8 / 256,
    smooth: false,
    decimals: 1000,
    metadata: true,
    unit: 'millimeter', // millimeter, inch, feet, meter or micrometer
    statusCallback: null
  }
  options = Object.assign({}, defaults, options)

  objects = flatten(objects)

  objects = objects.filter((object) => geom3.isA(object) || geom2.isA(object) || path2.isA(object))

  if (objects.length === 0) throw new Error('expected one or more geom3/geom2/path2 objects')

  options.statusCallback && options.statusCallback({ progress: 0 })

  // construct the contents of the XML
  let body = ['X3D',
    {
      profile: 'Interchange',
      version: '3.3',
      'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema-instance',
      'xsd:noNamespaceSchemaLocation': 'http://www.web3d.org/specifications/x3d-3.3.xsd'
    }
  ]
  if (options.metadata) {
    body.push(['head', {},
      ['meta', { name: 'creator', content: 'Created by JSCAD' }],
      ['meta', { name: 'reference', content: 'https://www.openjscad.xyz' }],
      ['meta', { name: 'created', content: new Date().toISOString() }]
    ])
  } else {
    body.push(['head', {},
      ['meta', { name: 'creator', content: 'Created by JSCAD' }]
    ])
  }
  body = body.concat(convertObjects(objects, options))

  // convert the contents to X3D (XML) format
  const contents = `<?xml version="1.0" encoding="UTF-8"?>
${stringify(body, 2)}`

  options && options.statusCallback && options.statusCallback({ progress: 100 })

  return [contents]
}

const convertObjects = (objects, options) => {
  const shapes = []
  objects.forEach((object, i) => {
    options.statusCallback && options.statusCallback({ progress: 100 * i / objects.length })

    if (geom3.isA(object)) {
      // convert to triangles
      object = modifiers.generalize({ snap: true, triangulate: true }, object)
      const polygons = geom3.toPolygons(object)
      if (polygons.length > 0) {
        shapes.push(convertGeom3(object, options))
      }
    }
    if (geom2.isA(object)) {
      shapes.push(convertGeom2(object, options))
    }
    if (path2.isA(object)) {
      shapes.push(convertPath2(object, options))
    }
  })
  const transform = ['Transform', { rotation: '1 0 0 -1.5708' }, ...shapes]
  const scene = ['Scene', {}, transform]
  return [scene]
}

/*
 * Convert the given object (path2) to X3D source
 */
const convertPath2 = (object, options) => {
  const points = path2.toPoints(object).slice()
  if (points.length > 1 && object.isClosed) points.push(points[0])
  const shape = ['Shape', shapeAttributes(object), convertPolyline2D(poly2.create(points), options)]
  if (object.color) {
    shape.push(convertAppearance(object, 'emissiveColor', options))
  }
  return shape
}

/*
 * Convert the given object (geom2) to X3D source
 */
const convertGeom2 = (object, options) => {
  const outlines = geom2.toOutlines(object)
  const group = ['Group', {}]
  outlines.forEach((outline) => {
    if (outline.length > 1) outline.push(outline[0]) // close the outline for conversion
    const shape = ['Shape', shapeAttributes(object), convertPolyline2D(poly2.create(outline), options)]
    if (object.color) {
      shape.push(convertAppearance(object, 'emissiveColor', options))
    }
    group.push(shape)
  })
  return group
}

/*
 * generate attributes for Shape node
 */

const shapeAttributes = (object, attributes = {}) => {
  if (object.id) {
    Object.assign(attributes, { DEF: checkDefName(object.id) })
  }
  return attributes
}

const checkDefName = (defName) => {
  const count = defNames.get(defName) || 0
  defNames.set(defName, count + 1)
  if (count > 0) console.warn(`Warning: object.id set as DEF but not unique. ${defName} set ${count + 1} times.`)
  return defName
}

/*
 * Convert the given object (poly2) to X3D source
 */
const convertPolyline2D = (object, options) => {
  const lineSegments = object.vertices.map((p) => `${p[0]} ${p[1]}`).join(' ')
  return ['Polyline2D', { lineSegments }]
}

/*
 * Convert color to Appearance
 */
const convertAppearance = (object, colorField, options) => {
  const colorRGB = object.color.slice(0, 3)
  const color = colorRGB.join(' ')
  const transparency = roundToDecimals(1.0 - object.color[3], options)
  const materialFields = { [colorField]: color, transparency }
  if (colorField === 'diffuseColor') {
    Object.assign(
      materialFields,
      { specularColor: '0.2 0.2 0.2', shininess: options.shininess })
  }
  return ['Appearance', ['Material', materialFields]]
}

/*
 * Convert the given object (geom3) to X3D source
 */
const convertGeom3 = (object, options) => {
  const shape = ['Shape', shapeAttributes(object), convertMesh(object, options)]
  let appearance = ['Appearance', {}, ['Material']]
  if (object.color) {
    appearance = convertAppearance(object, 'diffuseColor', options)
  }
  shape.push(appearance)
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
    { ccw: 'true', colorPerVertex: 'false', normalPerVertex: options.smooth, solid: 'false', index: indexList },
    ['Coordinate', { point: pointList }]
  ]
  if (!object.color) {
    faceset.push(['Color', { color: colorList }])
  }
  return faceset
}

const convertToTriangles = (object, options) => {
  const triangles = []
  const polygons = geom3.toPolygons(object)
  polygons.forEach((poly) => {
    const firstVertex = poly.vertices[0]
    for (let i = poly.vertices.length - 3; i >= 0; i--) {
      const triangle = poly3.fromPoints([
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

const roundToDecimals = (float, options) => Math.round(float * options.decimals) / options.decimals

/*
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
        const x = roundToDecimals(vertex[0], options)
        const y = roundToDecimals(vertex[1], options)
        const z = roundToDecimals(vertex[2], options)
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
