/*
JSCAD Geometry to STL Format Serialization

## License

Copyright (c) 2018-2019 JSCAD Organization https://github.com/jscad

All code released under MIT license

Notes:
1) geom2 conversion to:
     none
2) geom3 conversion to:
     STL mesh
3) path2 conversion to:
     none
*/

/**
 * Serializer of JSCAD geometries to STL mesh.
 * @module io/stl-serializer
 * @example
 * const { serializer, mimeType } = require('@jscad/stl-serializer')
 */

const { geometries, modifiers } = require('@jscad/modeling')

const { flatten, toArray } = require('@jscad/array-utils')

const { serializeBinary } = require('./CSGToStlb')
const { serializeText } = require('./CSGToStla')

const mimeType = 'application/sla'

/**
 * Serialize the give objects to STL mesh.
 * @param {Object} options - options for serialization
 * @param {String} [options.binary='true'] - target format for data
 * @param {Function} [options.statusCallback] - call back function for progress ({ progress: 0-100 })
 * @param {...Object} objects - objects to serialize as STL
 * @returns {Array} serialized contents with one STL mesh (either string or binary data)
 * @alias module:io/stl-serializer.serialize
 * @example
 * const geometry = primitives.cube()
 * const stlData = serializer({binary: false}, geometry)
 */
const serialize = (options, ...objects) => {
  const defaults = {
    binary: true,
    statusCallback: null
  }
  options = Object.assign({}, defaults, options)

  objects = flatten(objects)

  // convert only 3D geometries
  let objects3d = objects.filter((object) => geometries.geom3.isA(object))

  if (objects3d.length === 0) throw new Error('only 3D geometries can be serialized to STL')
  if (objects.length !== objects3d.length) console.warn('some objects could not be serialized to STL')

  // convert to triangles
  objects3d = toArray(modifiers.generalize({ snap: true, triangulate: true }, objects3d))

  return options.binary ? serializeBinary(objects3d, options) : serializeText(objects3d, options)
}

module.exports = {
  mimeType,
  serialize
}
