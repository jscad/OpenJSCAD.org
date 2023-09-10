/**
 * Serializer of JSCAD geometries to JSON strings.
 * @module io/json-serializer
 * @example
 * const { serializer, mimeType } = require('@jscad/json-serializer')
 */

import { flatten } from '@jscad/array-utils'

const mimeType = 'application/json'

// Replace all typed arrays in geometries with standard Arrays
// NOTE: 'this' in replacer is the object in which key was found
const replacer = (key, value) => {
  switch (key) {
    case 'transforms':
    case 'plane':
      return Array.from(value)
    case 'points':
    case 'vertices':
      return value.map((v) => Array.from(v))
    case 'outlines':
      return value.map((o) => o.map((v) => Array.from(v)))
    default:
      break
  }
  return value
}

/**
 * Serialize the give objects to JSON.
 * @param {Object} options - options for serialization, REQUIRED
 * @param {Object|Array} objects - objects to serialize as JSON
 * @returns {Array} serialized contents as JSON string
 * @alias module:io/json-serializer.serialize
 * @example
 * const geometry = cube()
 * const jsonData = serializer({}, geometry)
 */
const serialize = (options, ...objects) => {
  const defaults = {
    statusCallback: null
  }
  options = Object.assign({}, defaults, options)

  objects = flatten(objects)

  options.statusCallback && options.statusCallback({ progress: 0 })

  const notation = JSON.stringify(objects, replacer)

  options.statusCallback && options.statusCallback({ progress: 100 })

  return [notation]
}

export {
  mimeType,
  serialize
}
