/*
JSCAD Object to JSON Notation Serialization

## License

Copyright (c) JSCAD Organization https://github.com/jscad

All code released under MIT license

Notes:
1) geom2 conversion to:
     JSON
2) geom3 conversion to:
     JSON
3) path2 conversion to:
     JSON
*/

/**
 * Serializer of JSCAD geometries to JSON strings.
 * @module io/json-serializer
 * @example
 * const { serializer, mimeType } = require('@jscad/json-serializer')
 */

const { utils } = require('@jscad/modeling')

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
    case 'sides':
      return value.map((s) => [Array.from(s[0]), Array.from(s[1])])
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
 * const geometry = primitives.cube()
 * const jsonData = serializer({}, geometry)
 */
const serialize = (options, ...objects) => {
  const defaults = {
    statusCallback: null
  }
  options = Object.assign({}, defaults, options)

  objects = utils.flatten(objects)

  options.statusCallback && options.statusCallback({ progress: 0 })

  const notation = JSON.stringify(objects, replacer)

  options.statusCallback && options.statusCallback({ progress: 100 })

  return [notation]
}

const mimeType = 'application/json'

module.exports = {
  serialize,
  mimeType
}
