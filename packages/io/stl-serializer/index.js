/*
JSCAD Object to STL Format Serialization

## License

Copyright (c) 2018 JSCAD Organization https://github.com/jscad

All code released under MIT license

Notes:
1) CAG conversion to:
     none
2) CSG conversion to:
     STL mesh
3) Path2D conversion to:
     none
*/

const {serializeBinary} = require('./CSGToStlb')
const {serializeText} = require('./CSGToStla')

const {ensureManifoldness} = require('@jscad/io-utils')
const {toArray} = require('@jscad/io-utils/arrays')
const {isCSG} = require('@jscad/csg')

const mimeType = 'application/sla'

const serialize = (...params) => {
  let options = {}
  let objects
  if (params.length === 0) {
    throw new Error('no arguments supplied to serialize function !')
  } else if (params.length === 1) {
    // assumed to be object(s)
    objects = Array.isArray(params[0]) ? params[0] : params
  } else if (params.length > 1) {
    options = params[0]
    objects = params[1]
  }
  // make sure we always deal with arrays of objects as inputs
  objects = toArray(objects)

  const defaults = {
    binary: true,
    statusCallback: null
  }
  options = Object.assign({}, defaults, options)

  // only use valid CSG objects
  let csgs = []
  objects.forEach(function (object, i) {
    if (isCSG(object) & object.polygons.length > 0) {
      csgs.push(ensureManifoldness(object))
    }
  })
  return options.binary ? serializeBinary(csgs, options) : serializeText(csgs, options)
}

module.exports = {
  mimeType,
  serialize
}
