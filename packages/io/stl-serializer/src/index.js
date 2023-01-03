/**
 * Serializer of JSCAD geometries to STL mesh.
 * @module io/stl-serializer
 * @example
 * const { serializer, mimeType } = require('@jscad/stl-serializer')
 */

import { geometries, modifiers } from '@jscad/modeling'

import { flatten, toArray } from '@jscad/array-utils'

import { serializeBinary } from './serializeBinary.js'
import { serializeText } from './serializeText.js'

const mimeType = 'application/sla'

/**
 * Serialize the give objects to STL mesh.
 * @see http://en.wikipedia.org/wiki/STL_%28file_format%29#Binary_STL
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

export {
  mimeType,
  serialize
}
