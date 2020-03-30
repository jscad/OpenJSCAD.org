/*
JSCAD Object to JSON Notation Serialization

## License

Copyright (c) JSCAD Organization https://github.com/jscad

All code released under MIT license

Notes:
1) geom2 conversion to:
     JSON notation
2) geom3 conversion to:
     JSON notation
3) path2 conversion to:
     JSON notation
*/

const { geometry, utils } = require('@jscad/modeling')

// Replace all typed arrays in geometries with standard Arrays
// NOTE: 'this' in replacer is the object in which key was found
function replacer (key, value) {
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
 * Serialize the give objects to JSON notation.
 * @param {Object} options - options for serialization, REQUIRED
 * @param {Object|Array} objects - objects to serialize as JSON
 * @returns {Array} serialized contents, JSON notation
 */
const serialize = (options, ...objects) => {
  const defaults = {
    statusCallback: null
  }
  options = Object.assign({}, defaults, options)

  objects = utils.flatten(objects)

  options.statusCallback && options.statusCallback({ progress: 0 })

  // only serialize known objects (geometries)
  objects = objects.filter((object) => geometry.geom3.isA(object) || geometry.geom2.isA(object) || geometry.path2.isA(object))

  const notation = JSON.stringify(objects, replacer)

  options.statusCallback && options.statusCallback({ progress: 100 })

  return [notation]
}

const mimeType = 'application/json'

module.exports = {
  serialize,
  mimeType
}
