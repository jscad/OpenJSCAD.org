const { ensureManifoldness } = require('@jscad/io-utils')

const mimeType = 'application/json'

function fromCAG (CAG, options) {
  let str = '{ "type": "cag","sides": ['
  let comma = ''
  CAG.sides.map(
    function (side, i) {
      str += comma
      str += JSON.stringify(side)
      comma = ','
      options && options.statusCallback && options.statusCallback({progress: 100 * i / CAG.sides.length})
    }
  )
  str += '] }'
  return [str]
}

function fromCSG (CSG, options) {
  let str = '{ "type": "csg","polygons": ['
  let comma = ''
  CSG.polygons.map(
    function (polygon, i) {
      str += comma
      str += JSON.stringify(polygon)
      comma = ','
      options && options.statusCallback && options.statusCallback({progress: 100 * i / CSG.polygons.length})
    }
  )
  str += '],'
  str += '"isCanonicalized": ' + JSON.stringify(CSG.isCanonicalized) + ','
  str += '"isRetesselated": ' + JSON.stringify(CSG.isRetesselated)
  str += '}'
  return [str]
}

function serialize (data, options) {
  options && options.statusCallback && options.statusCallback({progress: 0})
  const result = 'sides' in data ? fromCAG(data, options) : fromCSG(ensureManifoldness(data), options)
  options && options.statusCallback && options.statusCallback({progress: 100})
  return result
}

module.exports = {
  serialize,
  mimeType
}
