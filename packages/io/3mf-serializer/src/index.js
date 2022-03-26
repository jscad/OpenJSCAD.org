/*
JSCAD Object to 3MF (XML) Format Serialization

## License

Copyright (c) 2022 JSCAD Organization https://github.com/jscad

All code released under MIT license

Notes:
1) geom2 conversion to:
     none
2) geom3 conversion to:
     mesh
3) path2 conversion to:
     none
*/

/**
 * Serializer of JSCAD geometries to 3D manufacturing format (XML)
 *
 * The serialization of the following geometries are possible.
 * - serialization of 3D geometry (geom3) to 3MF object (a unique mesh containing both vertices and triangles)
 *
 * Colors are added to base materials when found on the 3D geometry, i.e. attribute color.
 * Names are added to meshs when found on the 3D geometry, i.e. attribute name.
 *
 * @module io/3mf-serializer
 * @example
 * const { serializer, mimeType } = require('@jscad/3mf-serializer')
 */


const zipSync = require('fflate').zipSync
const strToU8 = require('fflate').strToU8

const stringify = require('onml/lib/stringify')

const { colors, geometries, modifiers } = require('@jscad/modeling')
const { flatten, toArray } = require('@jscad/array-utils')


const mimeType = 'model/3mf'
const fileExtension = '3mf'

/**
 * Serialize the give objects to 3MF contents (XML) or 3MF packaging (OPC).
 * @see https://3mf.io/specification/
 * @param {Object} [options] - options for serialization
 * @param {String} [options.unit='millimeter'] - unit of design; millimeter, inch, feet, meter or micrometer
 * @param {Boolean} [options.metadata=true] - add metadata to 3MF contents, such at CreationDate
 * @param {Array} [options.defaultcolor=[0,0,0,1]] - default color for objects
 * @param {Boolean} [options.compress=true] - package and compress the contents
 * @param {Object|Array} objects - objects to serialize into 3D manufacturing format
 * @returns {Array} serialized contents, 3MF contents (XML) or 3MF packaging (ZIP)
 * @example
 * const geometry = primitives.cube()
 * const package = serializer({unit: 'meter'}, geometry) // 3MF package, ZIP format
 */
const serialize = (options, ...objects) => {
  const defaults = {
    unit: 'millimeter', // micron, millimeter, centimeter, inch, foot, meter
    metadata: true,
    defaultcolor: [255/255, 160/255, 0, 1], // JSCAD Orange
    compress: true
  }
  options = Object.assign({}, defaults, options)

  objects = flatten(objects)

  // convert only 3D geometries
  let objects3d = objects.filter((object) => geometries.geom3.isA(object))

  if (objects3d.length === 0) throw new Error('only 3D geometries can be serialized to 3MF')
  if (objects.length !== objects3d.length) console.warn('some objects could not be serialized to 3MF')

  // convert to triangles
  objects = toArray(modifiers.generalize({ snap: true, triangulate: true }, objects3d))

  // construct the contents of the 3MF 'model'
  const body = ['model',
    {
      unit: options.unit,
      'xml:lang': 'und'
    },
    ['metadata', { name: 'Application' }, 'JSCAD']
  ]
  if (options.metadata) {
    body.push(['metadata', { name: 'CreationDate' }, new Date().toISOString()])
  }
  body.push(translateResources(objects, options))
  body.push(translateBuild(objects, options))

  // convert the contents to 3MF (XML) format
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
${stringify(body, 2)}`

  // compress and package the contents if requested
  if (options.compress) {
    const data = {
      '3D': {
        '3dmodel.model': strToU8(xml)
      },
      '_rels': {
        '.rels': strToU8(rels)
      },
      '[Content_Types].xml': strToU8(contenttype)
    }
    const opts = {
      comment: 'created by JSCAD'
    }
    const zipData = zipSync(data, opts)
    return [zipData.buffer]
  }
  return [xml]
}

const contenttype = `<?xml version="1.0" encoding="UTF-8" ?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml">
  </Default>
  <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml">
  </Default>
</Types>`

const rels = `<?xml version="1.0" encoding="UTF-8" ?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel">
  </Relationship>
</Relationships>`

const translateResources = (objects, options) => {
  let resources = ['resources', {}, translateMaterials(objects, options)]
  resources = resources.concat(translateObjects(objects, options))
  return resources
}

const translateMaterials = (objects, options) => {
  let basematerials = ['basematerials', { id: '0' }]

  const materials = []
  objects.forEach((object, i) => {
    let srgb = colors.rgbToHex(options.defaultcolor).toUpperCase()
    if (object.color) {
      srgb = colors.rgbToHex(object.color).toUpperCase()
    }
    materials.push(['base', { name: `mat${i}`, displaycolor: srgb }])
  })

  basematerials = basematerials.concat(materials)
  return basematerials
}

const translateObjects = (objects, options) => {
  const contents = []
  objects.forEach((object, i) => {
    if (geometries.geom3.isA(object)) {
      const polygons = geometries.geom3.toPolygons(object)
      if (polygons.length > 0) {
        options.id = i
        contents.push(convertToObject(object, options))
      }
    }
  })
  return contents
}

const translateBuild = (objects, options) => {
  let build = ['build', { }]

  const items = []
  objects.forEach((object, i) => {
    items.push(['item', { objectid: `${i + 1}` }])
  })

  build = build.concat(items)
  return build
}

/*
 * This section converts each 3D geometry to object / mesh
 */

const convertToObject = (object, options) => {
  const name = object.name ? object.name : `Part ${options.id}`
  const contents = ['object', { id: `${options.id + 1}`, type: 'model', pid: '0', pindex: `${options.id}`, name: name }, convertToMesh(object, options)]
  return contents
}

const convertToMesh = (object, options) => {
  const contents = ['mesh', {}, convertToVertices(object, options), convertToVolumes(object, options)]
  return contents
}

/*
 * This section converts each 3D geometry to mesh vertices
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
  const contents = ['vertex', { x: vertex[0], y: vertex[1], z: vertex[2] }]
  return contents
}

/*
 * This section converts each 3D geometry to mesh triangles
 */

const convertToVolumes = (object, options) => {
  let n = 0
  const polygons = geometries.geom3.toPolygons(object)

  let contents = ['triangles', {}]
  polygons.forEach((polygon) => {
    if (polygon.vertices.length < 3) {
      return
    }

    const triangles = convertToTriangles(polygon, n)

    contents = contents.concat(triangles)

    n += polygon.vertices.length
  })
  return contents
}

const convertToTriangles = (polygon, index) => {
  const contents = []

  // making sure they are all triangles (triangular polygons)
  for (let i = 0; i < polygon.vertices.length - 2; i++) {
    const triangle = ['triangle', { v1: index, v2: (index + i + 1), v3: (index + i + 2) }]
    contents.push(triangle)
  }
  return contents
}

module.exports = {
  serialize,
  mimeType,
  fileExtension
}
