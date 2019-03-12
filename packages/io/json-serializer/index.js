/*
JSCAD Object to JSON Format Serialization

## License

Copyright (c) 2018 JSCAD Organization https://github.com/jscad

All code released under MIT license

Notes:
1) CAG conversion to:
     none
2) CSG conversion to:
     JSON
3) Path2D conversion to:
     none
*/

const { ensureManifoldness } = require('@jscad/io-utils')
const {toArray} = require('@jscad/io-utils/arrays')
const { isCSG, isCAG } = require('@jscad/csg')

const mimeType = 'application/json'

function fromCAG (CAG, options) {
  let str = '{ "type": "cag","sides": ['
  let comma = ''
  CAG.sides.map(
    function (side, i) {
      str += comma
      str += JSON.stringify(side)
      comma = ','
    }
  )
  str += '] }'
  return str
}

function fromCSG (CSG, options) {
  let str = '{ "type": "csg","polygons": ['
  let comma = ''
  CSG.polygons.map(
    function (polygon, i) {
      str += comma
      str += JSON.stringify(polygon)
      comma = ','
    }
  )
  str += '],'
  str += '"isCanonicalized": ' + JSON.stringify(CSG.isCanonicalized) + ','
  str += '"isRetesselated": ' + JSON.stringify(CSG.isRetesselated)
  str += '}'
  return str
}

function serialize (...params) {
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
    statusCallback: null
  }
  options = Object.assign({}, defaults, options)

  options.statusCallback && options.statusCallback({progress: 0})

  let contents = []
  objects.forEach(function (object, i) {
    if (isCSG(object) && object.polygons.length > 0) {
      let data = ensureManifoldness(object)
      contents.push(fromCSG(data, options))
    }
    if (isCAG(object) && object.sides.length > 0) {
      contents.push(fromCAG(object, options))
    }
    options.statusCallback && options.statusCallback({progress: 100 * i / objects.length})
  })

  options.statusCallback && options.statusCallback({progress: 100})
  return contents
}

module.exports = {
  serialize,
  mimeType
}
